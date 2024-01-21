import { useState } from "react";
import ReactPlayer from "react-player";
import channels from "./output.json";

function App() {
  const [channelIndex, setChannelIndex] = useState(0);
  const [playerState, setPlayerState] = useState(0);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black z-0 relative">
      <div className="bg-gradient-to-r from-black h-screen w-full flex flex-col gap-5 p-5 overflow-y-scroll absolute left-0 top-0 bottom-0 z-50">
        <div className="w-1/4">
          {channels.map((channel, i) => (
            <div
              onClick={() => setChannelIndex(i)}
              className={` flex gap-3 rounded-xl text-white items-center`}
            >
              <div className="text-2xl font-bold">{i + 1}</div>
              <div
                className={`${
                  channelIndex === i && "bg-white/30"
                } w-full flex gap-3 items-center p-2 rounded-xl `}
              >
                <img
                  className="aspect-square w-16 rounded-lg"
                  src={channel.logo}
                />
                <div>
                  <div>{channel.name}</div>
                  <div className="font-light text-md opacity-50">
                    {channel.group}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
        {playerState === 0 && (
          <span className="relative flex h-16 w-16">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-16 w-16 bg-sky-500"></span>
          </span>
        )}
      </div>
      <div className="w-screen h-screen object-cover relative z-0">
        <ReactPlayer
          className="react-player z-0"
          url={channels[channelIndex].url}
          width="100%"
          height="100%"
          onReady={() => setPlayerState(1)}
          onPlay={() => setPlayerState(2)}
          onPause={() => setPlayerState(3)}
          onError={() => setPlayerState(9)}
          playing={false}
        />
        <img
          className=" hidden"
          src="https://tvpnlogopeu.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/ATBA1000004XC_20230222T012142SQUARE.png_20230222012142.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default App;
