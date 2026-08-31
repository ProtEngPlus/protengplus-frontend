import { stepsForCreateJob } from "../../../interfaces/CreateJob.interface";
export default function Stepper({
  step,
  changeStep,
}: {
  step: number;
  changeStep: (n: number) => void;
}) {
  return (
    // start at i = 1
    <div className="space-y-2 mb-5">
      <ol className="relative w-full flex justify-between">
        {[...Array(stepsForCreateJob.length - 1)].map((_, i) => (
          <li
            key={i + 1}
            className={`${
              i < stepsForCreateJob.length - 2
                ? "flex w-full relative text-black after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-10"
                : "flex relative text-gray-900"
            } ${
              i < step - 1 ? "after:bg-pep-blue" : "after:bg-pep-gray-border"
            }`}
          >
            <div className="block whitespace-nowrap z-10">
              <span
                className={`w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 ${
                  i < step - 1
                    ? "bg-pep-blue text-white border-transparent cursor-pointer"
                    : i === step - 1
                      ? "bg-white border-pep-blue text-pep-blue"
                      : "bg-white border-pep-gray-border text-black"
                }`}
                onClick={() => step > i && changeStep(i + 1)}
              >
                {i + 1}
              </span>
              {i === 1 ? (
                <div className="text-center">
                  Protein <br /> Representation
                </div>
              ) : i === 2 ? (
                <div className="text-center">
                  Upload <br /> Lab Input
                </div>
              ) : (
                stepsForCreateJob[i]
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
