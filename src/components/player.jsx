import ReactPlayer from "react-player";
import useGlobalStore from "../stores/useGlobalStore";

function Player() {
  const {
    channels,
    playerState,
    currentPlay,
    channelActiveIndex,
    playing,
    setPlayerState,
  } = useGlobalStore();

  console.log(currentPlay);
  return (
    channels.length > 0 && (
      <>
        <div className="absolute w-screen h-screen top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
          {playerState === 1 && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
              <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-x animate-puls"></div>
              <img
                className="w-full h-full object-cover"
                src={channels[channelActiveIndex].logo}
              />
            </div>
          )}
          {playerState === 3 && (
            <span className="relative flex text-xl text-white text-center">
              Une erreur c'est produite. <br /> Changement de chaine dans 5s
            </span>
          )}
        </div>

        <div className="w-screen h-screen object-cover relative z-0">
          {currentPlay && (
            <ReactPlayer
              className="react-player z-0"
              url={currentPlay.url}
              width="100%"
              height="100%"
              // onReady={() => setPlayerState(1)}
              // onBuffer={() => setPlayerState(2)}
              onPlay={(v) => setPlayerState(2)}
              onError={(v) => {
                if (v === "hlsError") return;
                setPlayerState(3);
              }}
              playing
            />
          )}
        </div>
      </>
    )
  );
}
export default Player;
