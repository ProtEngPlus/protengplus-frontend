import { Icon } from "@iconify/react/dist/iconify.js";
import { State } from "../../../../commons/interfaces/Job.interface";

export default function Stepper({
  stageId,
  state,
}: {
  stageId: number;
  state: State;
}) {
  const getTooltipText = (index: number): string => {
    switch (index) {
      case 0:
        return "Protein Query";
      case 1:
        return "Protein Representation";
      case 2:
        return "Top Model";
      default:
        return "Mutation";
    }
  };

  return (
    <ol className="flex items-center w-fit">
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <li
            className={`flex items-center w-full group ${
              // connect line
              index < 3
                ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4"
                : ""
            } ${
              index < stageId
                ? "after:border-pep-green"
                : "after:border-pep-gray-border"
            }`}
          >
            <div className="relative">
              {/* Stepper */}
              <div
                className={`flex flex-col items-center justify-center size-6 rounded-full lg:h-6 lg:w-6 shrink-0 ${
                  index < stageId // previous step
                    ? "bg-pep-green"
                    : index === stageId // current step
                    ? state === "COMPLETED"
                      ? "bg-pep-green"
                      : state === "FAILED"
                      ? "border-2 border-error text-xl leading-6 text-error"
                      : state === "PENDING"
                      ? "border-2 border-pep-green"
                      : state === "ONGOING"
                      ? "border-2 border-pep-green"
                      : "bg-pep-gray-light border-2 border-pep-gray-border"
                    : "bg-pep-gray-light border-2 border-pep-gray-border" // incoming step
                }`}
              >
                {index === stageId && state === "FAILED" ? (
                  "!"
                ) : index === stageId && state === "ONGOING" ? (
                  <Icon
                    icon="pepicons-pencil:dots-x"
                    className="text-pep-green w-full h-full"
                  />
                ) : null}
              </div>

              {/* Tooltip */}
              <div className="hidden min-w-10 absolute left-1/2 transform -translate-x-1/2 top-7 z-10 group-hover:block p-[2px] text-[8px] leading-none font-light text-white text-center bg-label rounded-md">
                {getTooltipText(index)}
                {/* Arrow */}
                <div className="bg-label size-1 rotate-45 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-[-10]"></div>
              </div>
            </div>
          </li>
        </div>
      ))}
    </ol>
  );
}
