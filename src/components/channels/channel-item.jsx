import useGlobalStore from "../../stores/useGlobalStore";

function ChannelItem({ index, logo, group, name }) {
  const {
    groups,
    channels,
    playing,
    channelActiveIndex,
    setChannelActiveIndex,
    setPlayerState,
    setCurrentPlay,
    setPlaying
  } = useGlobalStore();

  return (
    <div
      onClick={() => {
        setChannelActiveIndex(index);
        setPlayerState(1);
        setCurrentPlay(channels[index]);
        if(!playing) setPlaying(true)
      }}
      className={`${
        channelActiveIndex === index ? "bg-white/30 shadow-xl" : "bg-white/5"
      } w-full h-fit relative rounded-2xl cursor-pointer`}
    >
      {channelActiveIndex === index && (
        <div className="absolute top-5 bottom-5 -left-0.5 w-2 h-auto bg-white rounded-full" />
      )}

      <div className="w-full h-full flex gap-5 p-3 items-start backdrop-blur-xl rounded-2xl">
        <img
          className="aspect-square object-cover w-28 rounded-lg"
          loading="lazy"
          src={logo}
        />
        <div className="flex items-end justify-between h-full w-full">
          <div className="flex flex-col justify-between h-full w-fit">
            <div className="font-bold line-clamp-2 text-xl">{name}</div>
            <div className="font-light text-sm opacity-50">
              {groups.find((item) => item.id === group).name}
            </div>
          </div>

          <div className="w-12 px-3 bg-white/10 font-bold rounded-full flex justify-center items-center">
            {index + 1}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelItem;
