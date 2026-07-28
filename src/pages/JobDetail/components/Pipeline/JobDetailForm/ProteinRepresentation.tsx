import { useFormContext } from "react-hook-form";
import ContextWithHelperText from "../../../../../commons/components/CreateJob/Context/ContextWithHelper";
import DropdownInput from "../../../../../commons/components/CreateJob/InputField/InputField/Dropdown";
import {
  createJobConfig,
  MethodParameter,
} from "../../../../../commons/configs/createJobConfig";
import { Steps } from "../../../../../commons/interfaces/Job.interface";
import HelperText from "../../../../../commons/components/CreateJob/InputField/HelperText";
import InputFields from "../../../../../commons/components/CreateJob/InputField/InputFields";
import { PipelineItem } from "../../../../../commons/interfaces/CreateJob.interface";
import { useEffect } from "react";
import { formatTime } from "../../../../../commons/utils/FormatTime";

interface Props {
  isEdit: boolean;
  stageId: number;
  currentStep: number;
  handleChange: () => void;
  disable: boolean;
  jobConfig: {
    formatInput: number;
    description: string;
    parameters: MethodParameter[];
  };
  pipeline: PipelineItem[];
  setPipeline: (p: PipelineItem[]) => void;
}

export default function ProteinRepresentation({
  isEdit,
  stageId,
  currentStep,
  handleChange,
  disable,
  jobConfig,
  pipeline,
  setPipeline,
}: Props) {
  const { getValues, watch } = useFormContext();

  const currentSubMethod =
    watch(`tool_${Steps[currentStep]}`) ?? pipeline[currentStep].subMethod;

  const jobValue = getValues(`options.${currentSubMethod.toLowerCase()}`) || getValues(`options.${currentSubMethod}`)

  // update pipeline
  useEffect(() => {
    const updatedPipeline = [...pipeline];
    updatedPipeline[currentStep].subMethod = currentSubMethod;
    setPipeline(updatedPipeline);
  }, [currentSubMethod]);

  const HelperTextMethod = (
    <HelperText
      currentSubMethod={currentSubMethod}
      jobConfig={jobConfig}
      step={currentStep + 1}
      stepsFormat={Steps}
    />
  );
  return (
    <div className="space-y-11">
      <ContextWithHelperText
        title={Steps[currentStep]}
        helperText={HelperTextMethod}
        isConclusion={true}
        onEdit={isEdit}
        onEditChange={handleChange}
        disabled={disable}
        isJobDetail={true}
        runTime={
          stageId > 1 && getValues("run_time.evotune")
            ? formatTime(getValues("run_time.evotune"))
            : undefined
        }
      >
        <div className="space-y-4">
          {/* Select SubMethod's Tool */}
          <DropdownInput
            id={`tool_${Steps[currentStep]}`}
            label="Tool"
            defaultValue={currentSubMethod}
            options={Object.keys(
              createJobConfig[Steps[currentStep]]?.tool ?? {}
            )}
            onEdit={isEdit}
            disabled={disable}
          />

          {/* SubMethod description */}
          <div className="space-y-2 text-pep-dark-gray">
            <h1 className="text-2xl font-normal ">{currentSubMethod}</h1>
            <span className="text-sm font-light ">
              {createJobConfig[Steps[currentStep]]?.tool[currentSubMethod]
                ? createJobConfig[Steps[currentStep]]?.tool[currentSubMethod]
                    .description
                : ""}
            </span>
            <hr />
          </div>
        </div>

        {/* SubMethod's input */}
        <div className="space-y-2">
          <InputFields
            jobConfig={jobConfig}
            jobValue={jobValue}
            isEdit={isEdit}
            disable={disable}
          />
        </div>
      </ContextWithHelperText>
    </div>
  );
}
