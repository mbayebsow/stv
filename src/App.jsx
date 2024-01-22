import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import channels from "./output.json";

function ChannelsList({ selectedIndex, setSelectedIndex }) {
  const selectedElementRef = useRef(null);

  // useEffect(() => {
  //   if (selectedElementRef.current) {
  //     selectedElementRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [selectedIndex]);

  return channels.map((channel, i) => (
    <div
      key={i}
      onClick={() => setSelectedIndex(i)}
      ref={i === selectedIndex ? selectedElementRef : null}
      className="text-white cursor-pointer scroll-m-28 w-2/3 px-5"
    >
      <div
        className={`${
          selectedIndex === i
            ? "bg-gradient-to-tr from-primary-100 via-primary-100 to-gray-500 shadow-xl scale-110 translate-x-18 my-2"
            : "bg-primary-200 scale-100 translate-x-0 my-0"
        } w-full p-0.5 transition-all duration-100 relative`}
      >
        {selectedIndex === i && (
          <div className="absolute top-5 bottom-5 -left-0.5 w-2 h-auto bg-white" />
        )}

        <div className="w-full flex gap-5 p-4 items-start bg-primary-400/50 backdrop-blur">
          <img className="aspect-square w-28" src={channel.logo} />
          <div className="flex flex-col justify-between h-full">
            <div className="h-fit">
              <div className="font-bold line-clamp-2 text-2xl">{channel.name}</div>
              <div className="font-light text-md opacity-50">{channel.group}</div>
            </div>
            <div className="w-fit ">CH {i + 1}</div>
          </div>
        </div>
      </div>
    </div>
  ));
}

function CategoriesList({ selectedIndex, setSelectedIndex }) {
  const selectedElementRef = useRef(null);

  // useEffect(() => {
  //   if (selectedElementRef.current) {
  //     selectedElementRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [selectedIndex]);

  return channels.map((channel, i) => (
    <div
      key={i}
      onClick={() => setSelectedIndex(i)}
      ref={i === selectedIndex ? selectedElementRef : null}
      className="text-white cursor-pointer scroll-m-28 w-fit px-5"
    >
      <div
        className={`${
          selectedIndex === i ? "scale-110 translate-x-18 my-2" : "scale-100 translate-x-0 my-0"
        } w-full p-0.5 transition-all duration-100 relative flex gap-5 items-center`}
      >
        <img className="aspect-square w-14 rounded-full" src={channel.logo} />
        <div className="flex flex-col justify-between h-full">
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

  // useEffect(() => {
  //   setInactive(false);
  //   setPlayerState(0);

  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowUp" && channelIndex > 0) {
  //       setChannelIndex((prevIndex) => prevIndex - 1);
  //     } else if (event.key === "ArrowDown" && channelIndex < channels.length - 1) {
  //       setChannelIndex((prevIndex) => prevIndex + 1);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [channelIndex, channels]);

  // useEffect(() => {
  //   let timeoutId;

  //   const resetTimer = () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }

  //     timeoutId = setTimeout(() => {
  //       // setInactive(true);
  //     }, 10000);
  //   };

  //   const handleUserActivity = () => {
  //     setInactive(false);
  //     resetTimer();
  //   };

  //   window.addEventListener("mousemove", handleUserActivity);
  //   window.addEventListener("keydown", handleUserActivity);

  //   resetTimer();

  //   return () => {
  //     window.removeEventListener("mousemove", handleUserActivity);
  //     window.removeEventListener("keydown", handleUserActivity);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black z-0 relative">
      <div
        className={` ${
          inactive ? "-translate-x-full" : "translate-x-0"
        } bg-gradient-to-r from-primary-400 to-primary-400 h-screen w-screen transition-all duration-100 ease-out flex absolute left-0 top-0 bottom-0 z-50`}
      >
        <div className="flex flex-col gap-4 w-fit h-screen overflow-y-scroll">
          <CategoriesList />
        </div>
        <div className="flex flex-col gap-4 w-fit h-screen overflow-y-scroll">
          <ChannelsList selectedIndex={channelIndex} setSelectedIndex={setChannelIndex} />
        </div>
      </div>
      <div className="absolute w-screen h-screen top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
        {playerState === 0 && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
            <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-x animate-puls"></div>
            <img className="w-full h-full object-cover" src={channels[channelIndex].logo} />
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
