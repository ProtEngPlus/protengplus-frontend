import { State, RunType } from "../../../interfaces/Job.interface";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function JobRunTypeIcon({
  runType,
  state,
  onClick,
}: {
  runType: RunType;
  state: State;
  onClick: () => void;
}) {
  // Tooltip Text based on jobRunMode and status
  const getTooltipText = (runType: RunType, state: State): string => {
    const run_mode =
      runType === "auto" ? "in Auto Run Mode" : "in One-step Run Mode";
    const state_text =
      state === "COMPLETED"
        ? "Completed running"
        : state === "PENDING" || state === "CREATED"
        ? "Press to run"
        : state === "ONGOING"
        ? "Running"
        : "Failed running";
    return `${state_text} ${run_mode}`;
  };

  // Icon based on jobRunMode and status
  const renderIcon = () => {
    // for created and auto run mode
    if (runType === "auto" && state === "CREATED") {
      return (
        <Icon
          icon="heroicons-solid:fast-forward"
          className="size-8 text-customOrange"
          onClick={onClick}
        />
      );
      // for the rest of auto run mode's statuses
    } else if (runType === "auto") {
      return (
        <Icon
          icon="heroicons-solid:fast-forward"
          className="size-8 text-gray-300 "
        />
      );
    } else if (state === "PENDING" || state === "CREATED") {
      return (
        <Icon
          icon="iconoir:play-solid"
          className="size-8 text-[#76C280] cursor-pointer"
          onClick={onClick}
        />
      );
    } else if (state === "ONGOING") {
      return <Icon icon="ic:round-pause" className="size-8 text-gray-300" />;
    } else {
      // failed and completed
      return (
        <Icon icon="iconoir:play-solid" className="size-8 text-gray-300" />
      );
    }
  };
  return (
    <div className="relative group">
      {renderIcon()}
      <div className="hidden text-nowrap absolute left-1/2 transform -translate-x-1/2 top-7 z-10 group-hover:block p-[2px] text-[8px] leading-none font-light text-white text-center bg-gray-500 rounded-md">
        {getTooltipText(runType, state)}
        {/* Arrow */}
        <div className="bg-gray-500 size-1 rotate-45 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-[-10]"></div>
      </div>
    </div>
  );
}
