import { useEffect } from "react";
import useGlobalStore from "../../stores/useGlobalStore.jsx";
import ChannelItem from "./channel-item.jsx";

const ChannelList = () => {
  const { channels, groupActiveIndex, setChannels } = useGlobalStore();

  useEffect(() => {
    setChannels();
  }, [groupActiveIndex]);

  return (
    <div className="relative flex flex-col gap-2 overflow-y-scroll h-full w-3/5 p-5">
      {channels.map((channel, i) => (
        <ChannelItem
          key={i}
          index={i}
          name={channel.name}
          logo={channel.logo}
          group={channel.group}
        />
      ))}
    </div>
  );
};

export default ChannelList;
