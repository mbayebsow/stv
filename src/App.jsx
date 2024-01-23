import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import channels from "./channels.json";
import GroupList from "./components/group-list";
import ChannelList from "./components/channel-list";


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
        } h-screen w-screen transition-all p-5 bg-gradient-to-r from-black/80 duration-100 ease-out flex absolute left-0 top-0 bottom-0 z-50`}
      >
        <div className="flex w-1/2 bg-white/10 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-2xl relative z-0 pl-10">
          <div className="w-2/5 h-screen">
            <GroupList/>
          </div>
          <div className="w-3/5 h-screen px-5">
            <ChannelList/>
          </div>
        </div>

        <div className="w-1/2 h-screen "></div>
      </div>

      <div className="absolute w-screen h-screen top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
        {playerState === 0 && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
            <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-x animate-puls"></div>
            <img
              className="w-full h-full object-cover"
              src={channels[channelIndex].logo}
            />
          </div>
        )}
        {playerState === 2 && (
          <span className="relative flex text-xl text-white text-center">
            Une erreur c'est produite. <br /> Changement de chaine dans 5s
          </span>
        )}
      </div>

      <div className="w-screen h-screen object-cover relative z-0">
        {/*<ReactPlayer className="react-player z-0" url={channels[channelIndex].url} width="100%" height="100%" onReady={() => setPlayerState(1)} onError={() => setPlayerState(2)} playing={false} />*/}
      </div>
    </div>
  );
}

export default App;
