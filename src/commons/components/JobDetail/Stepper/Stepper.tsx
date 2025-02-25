import { Icon } from "@iconify/react/dist/iconify.js";
import { State, Steps } from "../../../interfaces/Job.interface";
import previousButton from "../../../../assets/images/JobDetail/chevron-left.svg";
import nextButton from "../../../../assets/images/JobDetail/chevron-right.svg";
export default function Stepper({
  stageId,
  state,
  currentStep,
  setCurrentStep,
  handleChange,
}: {
  stageId: number;
  state: State;
  currentStep: number;
  setCurrentStep: (n: number) => void;
  handleChange: () => boolean;
}) {
  const handleStepStyle = (n: number) => {
    if (state == "COMPLETED")
      return "bg-pep-gray text-white border-pep-gray-border";
    if (n < stageId) return "bg-pep-green text-white border-pep-gray-border";
    if (n === stageId) {
      switch (state) {
        case "FAILED":
          return "bg-white text-error border-error";
        case "PENDING":
          return "bg-white border-pep-orange";
        case "ONGOING":
          return "bg-pep-light-gray text-black";
        default:
          return "bg-pep-light-gray text-black";
      }
    }
    return "bg-pep-light-gray text-black border-pep-gray-border";
  };

  const handleIcon = (n: number) => {
    if (n === stageId && state === "FAILED") return "!";
    if (n === stageId && state === "PENDING")
      return <Icon icon="famicons:play" className="size-5 text-pep-orange" />;
    if (n === stageId && state === "ONGOING")
      return (
        <Icon icon="pepicons-pencil:dots-x" className="size-5 text-pep-green" />
      );
    return n + 1;
  };
  return (
    // start at i = 1
    <div className="flex space-x-10 mb-5 place-items-center">
      <img
        src={previousButton}
        alt="previos"
        onClick={() =>
          handleChange() && currentStep > 1 && setCurrentStep(currentStep - 1)
        }
        className="cursor-pointer"
      />
      <ol className="relative w-full flex justify-between">
        {Steps.map((step, index) => (
          <li
            key={index}
            className={`${
              index < Steps.length - 1
                ? "flex w-full relative text-black after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-10"
                : "flex relative text-gray-900"
            } ${
              index < currentStep - 1
                ? "after:bg-pep-blue"
                : "after:bg-pep-gray-border"
            }`}
          >
            <div className="block whitespace-nowrap z-10">
              <span
                className={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 cursor-pointer 
                    ${handleStepStyle(index)}
                    ${currentStep - 1 == index && "!border-pep-blue"}
                    
                `}
                onClick={() => handleChange() && setCurrentStep(index + 1)}
              >
                {handleIcon(index)}
              </span>
              {index === 1 ? (
                <div className="text-center">
                  Protein <br /> Representation
                </div>
              ) : (
                step
              )}
            </div>
          </li>
        ))}
      </ol>
      <img
        src={nextButton}
        alt="next"
        onClick={() =>
          handleChange() && currentStep < 4 && setCurrentStep(currentStep + 1)
        }
        className="cursor-pointer"
      />
    </div>
  );
}
