import {
  createJobConfig,
  formatInput,
  MethodParameter,
} from "../../../configs/createJobConfig";

export default function HelperText({
  stepsFormat,
  jobConfig,
  step,
  currentSubMethod,
  children,
}: {
  stepsFormat: string[];
  jobConfig: {
    formatInput: number;
    description: string;
    parameters: MethodParameter[];
  };
  step: number;
  currentSubMethod: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-4 space-y-4 text-pep-dark-gray">
      <div className="grid grid-cols-[1fr,4fr] space-x-3 text-start">
        <label className="font-light w-[88px]">Tool:</label>
        <span>{createJobConfig[stepsFormat[step - 1]].description}</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-normal ">{currentSubMethod}</h1>
        <span className="text-sm font-light ">{jobConfig.description}</span>
      </div>
      <hr />
      <div
        className={
          formatInput[jobConfig.formatInput ?? 1].helperText ||
          "flex flex-row gap-x-[5%] gap-y-4 flex-wrap"
        }
      >
        {jobConfig.parameters?.map((value) => {
          return (
            <div
              key={value.id}
              className={formatInput[jobConfig.formatInput].insideHelperText(
                value
              )}
            >
              <span className="text-nowrap">{value.name}:</span>
              <span>
                {value.description.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </span>
            </div>
          );
        }) || undefined}
      </div>
      {children}
    </div>
  );
}
