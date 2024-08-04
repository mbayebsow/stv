import ReactPlayer from "react-player";
import useGlobalStore from "../../stores/useGlobalStore";
import {useMemo} from "react";

function Player() {
  const { filteredChannels, playerState, currentPlay, playing, setPlayerState,groupActive } = useGlobalStore();


    return (
        filteredChannels.length > 0 && (
      <div className="relative z-0 w-full h-full">
        {currentPlay && playerState === 0 && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10">
            <img
              className="w-full h-full object-cover"
              src={currentPlay.logo}
            />
          </div>
        )}
        {(playerState === 1 || !currentPlay) && (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-10">
            <img
              className="w-full h-full object-cover"
              src="https://9to5mac.com/wp-content/uploads/sites/6/2019/07/apple_champs_elysees_boardroom.jpg?quality=82&strip=all"
            />
          </div>
        )}

        <div className="w-screen h-screen object-cover relative z-0">
          {currentPlay && (
            <ReactPlayer
              className="z-0"
              url={currentPlay.url}
              width="100%"
              height="100%"
              config={{
                file: {
                  forceHLS: true,
                  forceSafariHLS: true,
                  hlsOptions: {
                    //debug: true,
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: "Infinity",
                    maxBufferLength: 60,
                    maxMaxBufferLength: 6000,
                    startPosition: 6000,
                    enableSoftwareAES: true,
                  },
                },
              }}
              // onReady={() => setPlayerState(1)}
              // onBuffer={() => setPlayerState(2)}
              onPlay={(v: any) => {
                console.log("onPlay", v);
                setPlayerState(2);
              }}
              onPause={(v: any) => {
                console.log("onPause", v);
                setPlayerState(1);
              }}
              onError={(v: any) => {
                console.log("onError", v);
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
