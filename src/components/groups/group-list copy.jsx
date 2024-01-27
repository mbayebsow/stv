import { useRef, useState } from "react";
import cn from "classnames";
import useGlobalStore from "../../stores/useGlobalStore.jsx";

const GroupList = ({ data, leadingText }) => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const { groups, groupActiveIndex, setGroupActiveIndex } = useGlobalStore();

  const halfwayIndex = Math.ceil(groups.length / 2);
  const itemHeight = 60;
  const shuffleThreshold = halfwayIndex * itemHeight;
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    if (groupActiveIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (groupActiveIndex > itemIndex - halfwayIndex) {
        return (itemIndex - groupActiveIndex) * itemHeight;
      } else {
        return -(groups.length + groupActiveIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > groupActiveIndex) {
      return (itemIndex - groupActiveIndex) * itemHeight;
    }

    if (itemIndex < groupActiveIndex) {
      if ((groupActiveIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (groups.length - (groupActiveIndex - itemIndex)) * itemHeight;
      }
      return -(groupActiveIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setGroupActiveIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > groups.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      if (prevIndex - 1 < 0) {
        return groups.length - 1;
      }

      return prevIndex - 1;
    });
  };

  return (
    <div
      style={{ height: windowSize.current[1] }}
      className="relative w-2/5 flex flex-col gap-10"
    >
      {groups.map((group, i) => (
        <div
          key={i}
          onClick={() => setGroupActiveIndex(i)}
          className={cn(
            `w-full flex gap-5 items-center carousel-item absolute p-1 ${
              groupActiveIndex === i ? "opacity-100" : "opacity-100"
            }`,
            {
              active: groupActiveIndex === i,
              visible: Math.abs(determinePlacement(i)) <= visibleStyleThreshold,
            }
          )}
          style={{
            top: windowSize.current[1] / 2 + determinePlacement(i) / 2,
            transform: `translateY(${
              determinePlacement(i) - windowSize.current[1] / 15
            }px)`,
          }}
        >
          <div
            className={`w-full flex gap-5 items-start rounded-tl-full rounded-bl-full p-2 ${
              groupActiveIndex === i
                ? "bg-gradient-to-r from-white/30"
                : "bg-none"
            }`}
          >
            <img
              className={`aspect-square w-14 rounded-full ${
                groupActiveIndex === i ? "border-2" : "border-none"
              }`}
              loading="lazy"
              src={group.image}
            />
            <div className="flex flex-col justify-between h-full">
              <div className="font-bold line-clamp-1">{group.name}</div>
              <div className="font-light text-md opacity-50">204</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
