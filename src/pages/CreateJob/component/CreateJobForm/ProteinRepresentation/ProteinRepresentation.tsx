import { useFormContext } from "react-hook-form";
import { createJobConfig } from "../../../../../commons/configs/createJobConfig";
import {
  PipelineItem,
  stepsForCreateJob,
} from "../../../../../commons/interfaces/CreateJob.interface";
import { useEffect, useMemo, useState } from "react";
import ContextWithHelperText from "../../../../../commons/components/CreateJob/Context/ContextWithHelper";
import DropdownInput from "../../../../../commons/components/CreateJob/InputField/InputField/Dropdown";
import InputFields from "../../../../../commons/components/CreateJob/InputField/InputFields";
import HelperText from "../../../../../commons/components/CreateJob/InputField/HelperText";

interface Props {
  initialStep: number;
  step: number;
  pipeline: PipelineItem[];
  setPipeline: (p: PipelineItem[]) => void;
  isConclusion?: boolean;
  onEdit?: boolean;
}

export default function ProteinRepresentation({
  initialStep,
  step,
  pipeline,
  setPipeline,
  isConclusion = false,
  onEdit = true,
}: Props) {
  const { getValues, watch } = useFormContext();

  const currentSubMethod =
    watch(`tool_${stepsForCreateJob[step - 1]}`) ??
    pipeline[step - 1].subMethod;

  // isEdit (for conclusion step)
  const [isEdit, setIsEdit] = useState(onEdit);

  // update pipeline
  useEffect(() => {
    const updatedPipeline = [...pipeline];
    updatedPipeline[step - 1].subMethod = currentSubMethod;
    setPipeline(updatedPipeline);
  }, [currentSubMethod]);

  const jobConfig = useMemo(() => {
    return createJobConfig[stepsForCreateJob[step - 1]]?.tool[currentSubMethod];
  }, [currentSubMethod]);

  return (
    <div className="space-y-11">
      <ContextWithHelperText
        title={stepsForCreateJob[step - 1]}
        helperText={
          <HelperText
            currentSubMethod={currentSubMethod}
            jobConfig={jobConfig}
            step={step}
            stepsFormat={stepsForCreateJob}
          />
        }
        isConclusion={isConclusion}
        onEdit={isEdit}
        onEditChange={() => setIsEdit(!isEdit)}
        disabled={initialStep > step}
      >
        <div className="space-y-4">
          {/* Select SubMethod's Tool */}
          <DropdownInput
            id={`tool_${stepsForCreateJob[step - 1]}`}
            label="Tool"
            defaultValue={currentSubMethod}
            options={Object.keys(
              createJobConfig[stepsForCreateJob[step - 1]]?.tool ?? {},
            )}
            onEdit={isEdit}
            disabled={initialStep > step}
          />

          {/* SubMethod description */}
          {!isConclusion && (
            <div className="space-y-2 text-pep-dark-gray">
              <h1 className="text-2xl font-normal ">{currentSubMethod}</h1>
              <span className="text-sm font-light ">
                {createJobConfig[stepsForCreateJob[step - 1]]?.tool[
                  currentSubMethod
                ]
                  ? createJobConfig[stepsForCreateJob[step - 1]]?.tool[
                      currentSubMethod
                    ].description
                  : ""}
              </span>
              <hr />
            </div>
          )}
        </div>

        {/* SubMethod's input */}
        <div className="space-y-2">
          <InputFields
            jobConfig={jobConfig}
            jobValue={getValues(
              `${stepsForCreateJob[step - 1]}.${currentSubMethod}`,
            )}
            isEdit={isEdit}
            disable={initialStep > step}
          />
        </div>
      </ContextWithHelperText>
    </div>
  );
}
