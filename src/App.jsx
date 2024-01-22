import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import channels from "./channels.json";
import groups from "./groups.json";
import data from "./data.json";
import VerticalCarousel from "./VerticalCarousel";

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
      className="text-white cursor-pointer scroll-m-28 w-auto px-5"
    >
      <div
        className={`${
          selectedIndex === i
            ? "bg-gradient-to-r from-primary-100 via-primary-200 to-gray-500 shadow-xl scale-110 translate-x-18 my-2"
            : "bg-primary-200 scale-100 translate-x-0 my-0"
        } w-full p-0.5 transition-all duration-100 relative rounded-2xl overflow-hidden`}
      >
        {selectedIndex === i && (
          <div className="absolute top-5 bottom-5 -left-0.5 w-2 h-auto bg-white" />
        )}

        <div className="w-full flex gap-5 p-3 items-start bg-primary-400/50 backdrop-blur rounded-2xl">
          <img
            className="aspect-square w-28 rounded-lg"
            loading="lazy"
            src={channel.logo}
          />
          <div className="flex flex-col justify-between h-full">
            <div className="w-fit ">{i + 1}</div>
            <div className="h-fit">
              <div className="font-bold line-clamp-1">{channel.name}</div>
              <div className="font-light text-sm opacity-50">
                {channel.group}
              </div>
            </div>
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

  return groups.map((group, i) => (
    <div
      key={i}
      onClick={() => setSelectedIndex(i)}
      ref={i === selectedIndex ? selectedElementRef : null}
      className="text-white cursor-pointer scroll-m-28 w-auto px-5"
    >
      <div
        className={`${
          selectedIndex === i
            ? "scale-110 translate-x-18 my-2"
            : "scale-100 translate-x-0 my-0"
        } w-full p-0.5 transition-all duration-100 relative flex gap-5 items-center`}
      >
        <img
          className="aspect-square w-12 rounded-full"
          loading="lazy"
          src={group.image}
        />
        <div className="flex flex-col justify-between h-full">
          <div className="font-bold line-clamp-1">{group.name}</div>
          <div className="font-light text-md opacity-50">204</div>
        </div>
      </div>
    </div>
  ));
}

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
        } h-screen w-screen transition-all duration-100 ease-out flex absolute left-0 top-0 bottom-0 z-50`}
      >
        <div className="flex w-3/5 bg-primary-400 relative z-0 pl-10">
          <div className="w-2/5 h-screen">
            {/*<CategoriesList />*/}
            <VerticalCarousel data={data.slides} leadingText="Group" />
          </div>
          <div className="flex flex-col gap-2 w-3/5 h-screen overflow-y-scroll pt-20 px-5">
            <ChannelsList
              selectedIndex={channelIndex}
              setSelectedIndex={setChannelIndex}
            />
          </div>
        </div>

        <div className="w-2/5 h-screen bg-gradient-to-r from-primary-400 via-primary-400/80 to-primary-400/0"></div>
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
