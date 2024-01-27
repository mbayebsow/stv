import { Loader, Pause, Play, XOctagon } from "lucide-react";
import useGlobalStore from "../../stores/useGlobalStore";

function PlayerControl({ inactive }) {
  const { groups, currentPlay, playerState, channelActiveIndex, setPlaying } =
    useGlobalStore();

  return (
    currentPlay && (
      <div className="w-full h-fit flex  items-center justify-center gap-5">
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

          <div className="backdrop-blur rounded-full py-2 px-10 h-20 max-w-72 bg-white/10">
            <div className="font-bold text-3xl line-clamp-1 whitespace-nowrap">
              {currentPlay.name}
            </div>
            <div>
              {groups.find((group) => group.id === currentPlay.group).name}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PlayerControl;
