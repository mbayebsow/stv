import { useState, useEffect } from "react";
import channels from "./channels.json";
import GroupList from "./components/groups/group-list";
import ChannelList from "./components/channels/channel-list";
import Player from "./components/player";
import PlayerControl from "./components/player-control";

function App() {
  const [channelIndex, setChannelIndex] = useState(0);
  const [playerState, setPlayerState] = useState(0);
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    setInactive(false);
    setPlayerState(0);

    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && channelIndex > 0) {
        setChannelIndex((prevIndex) => prevIndex - 1);
      } else if (
        event.key === "ArrowDown" &&
        channelIndex < channels.length - 1
      ) {
        setChannelIndex((prevIndex) => prevIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [channelIndex, channels]);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        // setInactive(true);
      }, 10000);
    };

    const handleUserActivity = () => {
      setInactive(false);
      resetTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-primary-400 z-0 relative">
      <div
        className={` ${
          inactive ? "-translate-x-full" : "translate-x-0"
        } h-screen w-screen transition-all p-0 bg-gradient-to-r from-black/90 duration-100 ease-out flex absolute left-0 top-0 bottom-0 z-50`}
      >
        <div className="flex w-1/2 bg-white/10 overflow-hidden backdrop-blur-2xl">
          <GroupList />
          <ChannelList />
        </div>

        <div className="w-1/2 h-screen bg-black/20">
          <PlayerControl />
        </div>
      </div>
      <Player />
    </div>
  );
}

export default App;
