import { PipelineItem } from "../../../../../commons/interfaces/CreateJob.interface";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import ContextWithHelperText from "../../../../../commons/components/CreateJob/Context/ContextWithHelperText";
import {
  createJobConfig,
  formatInput,
  steps,
} from "../../../../../commons/configs/createJobConfig";
import InputField from "../../InputField/InputField";
import DropdownInput from "../../../../../commons/components/CreateJob/InputField/Dropdown";

interface Props {
  state: number;
  pipeline: PipelineItem[];
  setPipeline: (p: PipelineItem[]) => void;
  isConclusion?: boolean;
  onEdit?: boolean;
}

export default function Mutation({
  state,
  pipeline,
  setPipeline,
  isConclusion,
  onEdit,
}: Props) {
  const { getValues, watch } = useFormContext();
  const currentSubMethod = watch(`tool_${steps[state - 1]}`);
  const [isEdit, setEdit] = useState(onEdit);

  useEffect(() => {
    const updatedPipeline = [...pipeline];
    updatedPipeline[state - 2].subMethod = currentSubMethod;
    setPipeline(updatedPipeline);
  }, [currentSubMethod]);

  const jobConfig = useMemo(() => {
    return createJobConfig[steps[state - 1]]?.tool[currentSubMethod];
  }, [currentSubMethod]);

  // render subMethod's input
  const inputFields = useMemo(() => {
    if (!jobConfig) return null;
    return (
      <div
        className={
          formatInput[jobConfig.formatInput ?? 1].input ||
          "flex flex-row gap-x-[5%] gap-y-4 flex-wrap"
        }
      >
        {jobConfig.parameters.map((value) =>
          value.type === "rangeNumber" ? (
            <InputField
              key={value.id}
              id={value.id}
              type={value.type}
              label={value.name}
              options={value.dropdownItems}
              value={{
                low: getValues(
                  `${steps[state - 1]}.${currentSubMethod}.${value.id}_low`
                ),
                high: getValues(
                  `${steps[state - 1]}.${currentSubMethod}.${value.id}_high`
                ),
              }}
              onEdit={isEdit}
              additionalValidation={value.additionalValidation}
            />
          ) : (
            <InputField
              key={value.id}
              id={value.id}
              type={value.type}
              label={value.name}
              options={value.dropdownItems}
              value={getValues(
                `${steps[state - 1]}.${currentSubMethod}.${value.id}`
              )}
              onEdit={isEdit}
              additionalValidation={value.additionalValidation}
            />
          )
        )}
      </div>
    );
  }, [jobConfig, isEdit]);

  // helper text
  const helperText = useMemo(() => {
    if (!jobConfig) return null;
    return (
      <div className="mt-4 space-y-4 text-pep-dark-gray">
        <div className="grid grid-cols-[1fr,4fr] space-x-3 text-start">
          <label className="font-light w-[88px]">Tool:</label>
          <span>{createJobConfig[steps[state - 1]].description}</span>
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
                <span className="text-wrap">{value.description}</span>
              </div>
            );
          }) || undefined}
        </div>
      </div>
    );
  }, [jobConfig]);

  return (
    <div className="space-y-2">
      <ContextWithHelperText
        title={steps[state - 1]}
        helperText={helperText}
        isConclusion={isConclusion}
        onEdit={isEdit}
        onEditChange={() => setEdit(!isEdit)}
      >
        <div className="space-y-4">
          {/* Select SubMethod's Tool */}
          <DropdownInput
            id={`tool_${steps[state - 1]}`}
            label="Tool"
            defaultValue={currentSubMethod}
            options={Object.keys(createJobConfig[steps[state - 1]]?.tool ?? {})}
            onEdit={isEdit}
          />

          {/* SubMethod description */}
          {!isConclusion && (
            <div className="space-y-2 text-pep-dark-gray">
              <h1 className="text-2xl font-normal ">{currentSubMethod}</h1>
              <span className="text-sm font-light ">
                {createJobConfig[steps[state - 1]]?.tool[currentSubMethod]
                  ? createJobConfig[steps[state - 1]]?.tool[currentSubMethod]
                      .description
                  : ""}
              </span>
              <hr />
            </div>
          )}
        </div>
        {/* SubMethod's input */}
        {inputFields}
      </ContextWithHelperText>
    </div>
  );
}
