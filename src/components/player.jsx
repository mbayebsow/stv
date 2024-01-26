import ReactPlayer from "react-player";
import useGlobalStore from "../stores/useGlobalStore";

function Player() {
  const { channels, playerState, currentPlay, channelActiveIndex, playing, setPlayerState } =
    useGlobalStore();

  return (
    channels.length > 0 && (
      <div className="relative z-0 w-full h-full">
        {currentPlay && playerState === 0 && (
          <div className="absolute w-screen h-screen top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-x animate-puls"></div>
              <img className="w-full h-full object-cover" src={channels[channelActiveIndex].logo} />
            </div>
          </div>
        )}

        <div className="w-screen h-screen object-cover relative z-0">
          {currentPlay && (
            <ReactPlayer
              className="react-player z-0"
              url={currentPlay.url}
              width="100%"
              height="100%"
              onPlay={() => setPlayerState(2)}
              onPause={() => setPlayerState(1)}
              onError={(v) => {
                console.log(v);
                if (v === "hlsError") return;
                setPlayerState(3);
              }}
              playing={playing}
            />
          )}
        </div>
      </div>
    )
  );
}
export default Player;
