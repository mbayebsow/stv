import { Play } from "lucide-react";
import useGlobalStore from "../stores/useGlobalStore";

function PlayerControl() {
  const { groups, channels, channelActiveIndex } = useGlobalStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-10">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/20 overflow-hidden">
          <div className="backdrop-blur w-full h-full flex items-center justify-center">
            <Play fill="white" size={50} />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center gap-5">
        {channels.length > 0 && (
          <>
            <div className="font-bold text-[8vw]">46</div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerControl;
