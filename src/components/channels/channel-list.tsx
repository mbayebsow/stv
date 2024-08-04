import {useEffect, useMemo} from "react";
import { SimpleReveal } from "simple-reveal";
import useGlobalStore from "../../stores/useGlobalStore";
import ChannelItem from "./channel-item";

const ChannelList = () => {
  const { filteredChannels, groupActive } = useGlobalStore();

  return (
    <div className="relative flex flex-col gap-3 overflow-y-scroll h-full w-3/5 p-5">
      {filteredChannels.map((channel, i) => (
        <SimpleReveal
          key={i}
          delay={i * 100}
          render={({ ref, cn }) => (
            <ChannelItem
              revealref={ref}
              className={cn()}
              key={i}
              index={i}
              name={channel.name}
              logo={channel.logo}
              group={channel.group}
            />
          )}
        />
      ))}
    </div>
  );
};

export default ChannelList;
