import { SimpleReveal } from "simple-reveal";
import useGlobalStore from "../../stores/useGlobalStore.jsx";
import GroupItem from "./group-item.jsx";

const GroupList = () => {
  const { groups } = useGlobalStore();

  return (
    <div className="relative w-2/5 flex flex-col gap-5 overflow-y-scroll p-5">
      {groups.map((group, i) => (
        <SimpleReveal
          key={i}
          delay={i * 100}
          render={({ ref, cn }) => (
            <GroupItem
              revealref={ref}
              className={cn()}
              key={i}
              index={i}
              name={group.name}
              image={group.image}
            />
          )}
        />
      ))}
    </div>
  );
};

export default GroupList;
