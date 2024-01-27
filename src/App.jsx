import { useState, useEffect } from "react";
import GroupList from "./components/groups/group-list";
import ChannelList from "./components/channels/channel-list";
import Player from "./components/player/player";
import PlayerControl from "./components/player/player-control";
import useGlobalStore from "./stores/useGlobalStore";
import Clock from "./components/clock";

function App() {
  const { playerState } = useGlobalStore();
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setInactive(true);
      }, 5000);
    };

    const handleUserActivity = () => {
      if (playerState != 2) return;
      setInactive(false);
      resetTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, [playerState]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black z-0 relative">
      <div
        className={` ${
          inactive
            ? "bg-none"
            : "bg-gradient-to-r from-black/50 via-black/30 to-black/50"
        } h-screen w-screen flex absolute left-0 top-0 bottom-0 z-50 p-5`}
      >
        <div
          className={`${
            inactive ? "-translate-x-full -ml-5" : "translate-x-0"
          } flex w-1/2 bg-white/10 overflow-hidden backdrop-blur-2xl rounded-2xl shadow-2xl relative duration-100 transition-all ease-in-out`}
        >
          <GroupList />
          <ChannelList />
        </div>

        <div
          className={`${
            inactive ? "translate-x-full" : "translate-x-0"
          } w-1/2 h-full flex flex-col justify-between items-center p-10`}
        >
          <Clock />
          <PlayerControl inactive={inactive} />
        </div>
      </div>

      <Player />
    </div>
  );
}

export default App;
