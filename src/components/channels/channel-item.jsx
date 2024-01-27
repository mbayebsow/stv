import useGlobalStore from "../../stores/useGlobalStore";

function ChannelItem({ revealref, className, index, logo, group, name }) {
  const {
    groups,
    channels,
    playing,
    channelActiveIndex,
    setChannelActiveIndex,
    setPlayerState,
    setCurrentPlay,
    setPlaying,
  } = useGlobalStore();

  return (
    <div
      ref={revealref}
      onClick={() => {
        setChannelActiveIndex(index);
        setPlayerState(0);
        setCurrentPlay(channels[index]);
        if (!playing) setPlaying(true);
      }}
      className={`${
        channelActiveIndex === index
          ? "bg-white/40 text-black shadow-2xl"
          : "bg-white/5"
      } ${className} w-full h-auto relative rounded-2xl cursor-pointer`}
    >
      {channelActiveIndex === index && (
        <div className="absolute top-5 bottom-5 -left-1 w-2 h-auto bg-white rounded-full" />
      )}

      <div className="w-full h-full flex gap-5 p-3 items-start backdrop-blur rounded-2xl z-0">
        <img
          className="aspect-square object-cover w-20 h-20 rounded-lg"
          loading="lazy"
          src={logo}
        />
        <div className="flex flex-col justify-between h-full w-fit">
          <div className="font-bold line-clamp-2 text-xl">{name}</div>
          <div className="font-light text-sm opacity-50">
            {groups.find((item) => item.id === group).name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelItem;
