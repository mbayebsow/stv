import { Pause, Play, XOctagon } from "lucide-react";
import useGlobalStore from "../stores/useGlobalStore";

function PlayerControl() {
  const {
    groups,
    channels,
    currentPlay,
    playerState,
    channelActiveIndex,
    setCurrentPlay,
    setPlaying,
  } = useGlobalStore();

  return (
    <div className="w-full h-full flex flex-col justify-end p-10 bg-gradient-to-t from-black/60">
      <div className="w-full flex items-center gap-5">
        {channels.length > 0 && (
          <>
            <div className="font-bold text-[8vw]">{channelActiveIndex + 1}</div>
            <div className="">
              <div className="font-bold text-3xl">
                {channels[channelActiveIndex].name}
              </div>
              <div>
                {
                  groups.find(
                    (group) => group.id === channels[channelActiveIndex].group
                  ).name
                }
              </div>
            </div>
            <div className="w-20 h-20 rounded-full backdrop-blur border overflow-hidden">
              {playerState === 1 && (
                <button
                  onClick={() => {
                    if (!currentPlay) {
                      setCurrentPlay(channels[channelActiveIndex]);
                      setPlaying(true);
                    } else {
                      setPlaying(true);
                    }
                  }}
                  className="bg-white/10 w-full h-full flex items-center justify-center"
                >
                  <Play fill="white" size={50} />
                </button>
              )}
              {playerState === 2 && (
                <button
                  onClick={() => setPlaying(false)}
                  className="bg-white/10 w-full h-full flex items-center justify-center"
                >
                  <Pause fill="white" size={50} />
                </button>
              )}
              {playerState === 3 && (
                <div className="bg-red-500/10 w-full h-full flex items-center justify-center">
                  <XOctagon fill="white" size={50} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerControl;
