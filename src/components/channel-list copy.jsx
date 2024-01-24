import { useRef, useEffect } from "react";
import cn from "classnames";
import useGlobalStore from "../stores/useGlobalStore.jsx";

const ChannelList = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const {
    channels,
    channelActiveIndex,
    groupActiveIndex,
    setChannels,
    setChannelActiveIndex,
    setCurrentPlay,
    setPlaying,
    setPlayerState,
  } = useGlobalStore();

  const halfwayIndex = Math.ceil(channels.length / 2);
  const itemHeight = 100;
  const shuffleThreshold = halfwayIndex * itemHeight;
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    if (channelActiveIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (channelActiveIndex > itemIndex - halfwayIndex) {
        return (itemIndex - channelActiveIndex) * itemHeight;
      } else {
        return -(channels.length + channelActiveIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > channelActiveIndex) {
      return (itemIndex - channelActiveIndex) * itemHeight;
    }

    if (itemIndex < channelActiveIndex) {
      if ((channelActiveIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (
          (channels.length - (channelActiveIndex - itemIndex)) * itemHeight
        );
      }
      return -(channelActiveIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setChannelActiveIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > channels.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      if (prevIndex - 1 < 0) {
        return channels.length - 1;
      }

      return prevIndex - 1;
    });
  };

  useEffect(() => {
    setChannels();
    setChannelActiveIndex(0);
  }, [groupActiveIndex]);

  return (
    <div
      style={{ height: windowSize.current[1] }}
      className="relative w-full flex flex-col gap-10"
    >
      {channels.map((channel, i) => (
        <div
          key={i}
          onClick={() => {
            if (channelActiveIndex === i) return;
            setPlayerState(1);
            setChannelActiveIndex(i);
            setCurrentPlay(channel);
            setPlaying(true);
          }}
          className={cn(
            `w-full flex gap-5 items-center carousel-item absolute p-1`,
            {
              active: channelActiveIndex === i,
              visible: Math.abs(determinePlacement(i)) <= visibleStyleThreshold,
            }
          )}
          style={{
            top: windowSize.current[1] / 2 + determinePlacement(i) / 2,
            transform: `translateY(${
              determinePlacement(i) - windowSize.current[1] / 9
            }px)`,
          }}
        >
          <div
            className={`${
              channelActiveIndex === i
                ? "bg-white/20 shadow-xl scale-105"
                : "bg-white/10 scale-95 translate-x-0 my-0"
            } w-full transition-all duration-100 relative rounded-2xl overflow-hidden`}
          >
            {channelActiveIndex === i && (
              <div className="absolute top-5 bottom-5 -left-0.5 w-2 h-auto bg-white rounded-full" />
            )}

            <div className="w-full flex gap-5 p-3 items-start backdrop-blur-xl rounded-2xl">
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
      ))}
    </div>
  );
};

export default ChannelList;
