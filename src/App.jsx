import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import channels from "./output.json";

function ChannelsList({ selectedIndex, setSelectedIndex }) {
  const selectedElementRef = useRef(null);

  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedIndex]);

  return channels.map((channel, i) => (
    <div
      key={i}
      onClick={() => setSelectedIndex(i)}
      ref={i === selectedIndex ? selectedElementRef : null}
      className={`flex gap-3 rounded-xl text-white items-center cursor-pointer scroll-m-5 `}
    >
      <div className="w-7 text-center">{i + 1}</div>
      <div
        className={`${
          selectedIndex === i && "bg-gray-300 text-black"
        } w-full flex gap-3 items-center p-1 rounded-xl `}
      >
        <img className="aspect-square w-12 rounded-lg" src={channel.logo} />
        <div>
          <div className="font-bold line-clamp-1">{channel.name}</div>
          <div className="font-light text-md opacity-50">{channel.group}</div>
        </div>
      </div>
    </div>
  ));
}

function App() {
  const [channelIndex, setChannelIndex] = useState(0);
  const [playerState, setPlayerState] = useState(0);
  const [inactive, setInactive] = useState(false);

  // useEffect(() => {
  //   if (!openList) setOpenList(true);
  //   setPlayerState(0);
  //   setTimeout(() => {
  //     setOpenList(false);
  //   }, 5000);
  // }, [channelIndex]);

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
    <div className="w-screen h-screen overflow-hidden bg-black z-0 relative">
      <div
        className={` ${
          inactive ? "-translate-x-full" : "translate-x-0"
        } bg-gradient-to-r from-black/70 h-screen w-screen p-3 transition-all duration-100 ease-out flex flex-col gap-5 absolute left-0 top-0 bottom-0 z-50`}
      >
        <div
          className={`flex flex-col gap-2 w-1/4 h-screen overflow-y-scroll p-3 bg-black/30 backdrop-blur-xl rounded-3xl`}
        >
          <ChannelsList
            selectedIndex={channelIndex}
            setSelectedIndex={setChannelIndex}
          />
        </div>
      </div>
      <div className="absolute w-screen h-screen top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
        {playerState === 0 && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
            <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-xl animate-pulse"></div>
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
        <ReactPlayer
          className="react-player z-0"
          url={channels[channelIndex].url}
          width="100%"
          height="100%"
          onReady={() => setPlayerState(1)}
          onError={() => setPlayerState(2)}
          playing={false}
        />
      </div>
    </div>
  );
}

export default App;
