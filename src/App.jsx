import { useState, useEffect } from "react";
import GroupList from "./components/groups/group-list";
import ChannelList from "./components/channels/channel-list";
import Player from "./components/player";
import PlayerControl from "./components/player-control";
import useGlobalStore from "./stores/useGlobalStore";

function App() {
  const { playerState } = useGlobalStore();
  const [inactive, setInactive] = useState(false);

  // useEffect(() => {
  //   setInactive(false);
  //   setPlayerState(1);

  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowUp" && channelIndex > 0) {
  //       setChannelIndex((prevIndex) => prevIndex - 1);
  //     } else if (
  //       event.key === "ArrowDown" &&
  //       channelIndex < channels.length - 1
  //     ) {
  //       setChannelIndex((prevIndex) => prevIndex + 1);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [channelIndex, channels]);

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
      <div className="h-screen w-screen flex absolute left-0 top-0 bottom-0 z-50">
        <div
          className={`${
            inactive ? "-translate-x-full" : "translate-x-0"
          } flex w-1/2 bg-black/60 overflow-hidden backdrop-blur-2xl`}
        >
          <GroupList />
          <ChannelList />
        </div>

        <PlayerControl inactive={inactive} />
      </div>

      <Player />
    </div>
  );
}

export default App;
