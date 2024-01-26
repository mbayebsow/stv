import { Loader, Pause, Play, XOctagon } from "lucide-react";
import useGlobalStore from "../stores/useGlobalStore";

function PlayerControl({ inactive }) {
  const { groups, currentPlay, playerState, channelActiveIndex, setPlaying } = useGlobalStore();

  return (
    currentPlay && (
      <div
        className={`${
          inactive ? "translate-x-full" : "translate-x-0"
        } w-1/2 h-full flex flex-col justify-end p-10 bg-gradient-to-t from-black`}
      >
        <div className="w-full h-fit flex  items-center justify-between w-full gap-5">
          <div className="flex gap-5">
            <div className="w-20 h-20 rounded-full backdrop-blur  overflow-hidden">
              {currentPlay && playerState === 0 && (
                <button className="bg-white/10 w-full h-full flex items-center justify-center animate-spin">
                  <Loader color="white" size={50} />
                </button>
              )}
              {playerState === 1 && (
                <button
                  onClick={() => {
                    if (!currentPlay) {
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
                <div className="bg-red-500 w-full h-full flex items-center justify-center">
                  <XOctagon color="white" size={50} />
                </div>
              )}
            </div>

            <div className="backdrop-blur rounded-full py-2 px-10 h-20 bg-white/10">
              <div className="font-bold text-3xl">{currentPlay.name}</div>
              <div>{groups.find((group) => group.id === currentPlay.group).name}</div>
            </div>
          </div>

          <div className="font-bold text-[100px]">{channelActiveIndex + 1}</div>
        </div>
      </div>
    )
  );
}

export default PlayerControl;
