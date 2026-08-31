import clsx from "clsx";
import { MutationStateType } from "../../../interfaces/Mutation.interface";

interface StateProps {
  state: MutationStateType;
  className?: string;
  onClick?: () => void;
}

const stateMap = {
  COMPLETED: {
    name: "Completed",
    className: "text-pep-green bg-green-100",
    tooltip: "Mutation has finished",
  },
  ONGOING: {
    name: "Ongoing",
    className: "text-pep-pink bg-pink-100",
    tooltip: "Mutation is running",
  },
  FAILED: {
    name: "Failed",
    className: "text-error bg-red-100",
    tooltip: "Mutation is failed",
  },
  PENDING: {
    name: "Pending",
    className: "text-pep-orange bg-yellow-100",
    tooltip: "Mutation is paused",
  },
};

export default function MutationState({
  state,
  className,
  onClick,
  ...props
}: StateProps) {
  const status = stateMap[state];

  if (!status) {
    return <div>Status not found</div>; // Fallback for unknown statuses
  }

  return (
    <div className="relative group">
      <div
        id={state}
        className={clsx(
          "font-normal px-[10px] py-[3px] rounded-[30px] w-[94px] h-[26px] min-w-fit text-xs leading-5 text-center cursor-default",
          status.className,
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {status.name}
      </div>
      <div className="hidden text-nowrap absolute left-1/2 transform -translate-x-1/2 top-7 z-10 group-hover:block p-[2px] text-[8px] leading-none font-light text-white text-center bg-label rounded-md">
        {status.tooltip}
        {/* Arrow */}
        <div className="bg-label size-1 rotate-45 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-[-10]"></div>
      </div>
    </div>
  );
}
