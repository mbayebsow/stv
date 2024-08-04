import React from "react";
import useGlobalStore from "../../stores/useGlobalStore";

interface GroupItemProps {
    revealref: any,
    className: string,
    image:string,
    name: string
}

function GroupItem({ revealref, className, image, name }:GroupItemProps) {
  const { groupActive, setGroupActive, setChannelActiveIndex } = useGlobalStore();

  return (
    <div
      ref={revealref}
      onClick={() => {
        setGroupActive(name);
        setChannelActiveIndex(0);
      }}
      className={`w-full flex gap-5 items-start rounded-tl-full rounded-bl-full p-2 cursor-pointer ${className} ${
        groupActive === name
          ? "bg-gradient-to-r from-white/30"
          : "bg-none"
      }`}
    >
      <img
        className={`aspect-square w-14 rounded-full ${
          groupActive === name ? "border-2" : "border-none"
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
