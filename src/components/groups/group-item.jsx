import React from "react";
import useGlobalStore from "../../stores/useGlobalStore";

function GroupItem({ index, image, name }) {
  const { groupActiveIndex, setGroupActiveIndex, setChannelActiveIndex } = useGlobalStore();

  return (
    <div
      onClick={() => {
        setGroupActiveIndex(index);
        setChannelActiveIndex(0);
      }}
      className={`w-full flex gap-5 items-start rounded-tl-full rounded-bl-full p-2 cursor-pointer ${
        groupActiveIndex === index ? "bg-gradient-to-r from-white/30" : "bg-none"
      }`}
    >
      <img
        className={`aspect-square w-14 rounded-full ${
          groupActiveIndex === index ? "border-2" : "border-none"
        }`}
        loading="lazy"
        src={image}
      />
      <div className="w-full">
        <div className="font-bold line-clamp-1">{name}</div>
        <div className="font-light text-md opacity-50">204</div>
      </div>
    </div>
  );
}

export default GroupItem;
