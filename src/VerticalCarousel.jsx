import { useRef, useState } from "react";
import cn from "classnames";
import groups from "./groups.json";

const VerticalCarousel = ({ data, leadingText }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const halfwayIndex = Math.ceil(groups.length / 2);
  const itemHeight = 52;
  const shuffleThreshold = halfwayIndex * itemHeight;
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    if (activeIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        return -(groups.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (groups.length - (activeIndex - itemIndex)) * itemHeight;
      }
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
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
      className="relative w-full flex flex-col gap-10"
    >
      {groups.map((group, i) => (
        <div
          onClick={() => setActiveIndex(i)}
          className={cn(
            `w-full flex gap-5 items-center carousel-item absolute p-1 ${
              activeIndex === i
                ? "bg-gradient-to-r from-primary-100 rounded-s-full"
                : "scale-100 translate-x-0 my-0 opacity-10"
            }`,
            {
              active: activeIndex === i,
              visible: Math.abs(determinePlacement(i)) <= visibleStyleThreshold,
            }
          )}
          style={{
            top: windowSize.current[1] / 2 + determinePlacement(i),
            transform: `translateY(${determinePlacement(i) - 35}px)`,
          }}
        >
          <div className="w-full flex gap-5 items-start">
            <img
              className={`aspect-square w-12 rounded-full ${
                activeIndex === i ? "border-2" : "border-none p-0"
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

export default VerticalCarousel;
