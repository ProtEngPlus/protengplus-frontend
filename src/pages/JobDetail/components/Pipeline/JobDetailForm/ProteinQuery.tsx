import { useFormContext } from "react-hook-form";
import ContextWithHelperText from "../../../../../commons/components/CreateJob/Context/ContextWithHelper";
import DropdownInput from "../../../../../commons/components/CreateJob/InputField/InputField/Dropdown";

import InputProtein from "../../../../../commons/components/CreateJob/InputProtein/InputProtein";
import {
  createJobConfig,
  MethodParameter,
} from "../../../../../commons/configs/createJobConfig";
import { State, Steps } from "../../../../../commons/interfaces/Job.interface";
import HelperText from "../../../../../commons/components/CreateJob/InputField/HelperText";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { PipelineItem } from "../../../../../commons/interfaces/CreateJob.interface";
import { formatTime } from "../../../../../commons/utils/FormatTime";
import InputFields from "../../../../../commons/components/CreateJob/InputField/InputFields";

interface Props {
  isEdit: boolean;
  currentStep: number;
  stageId: number;
  state: State;
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

export default function ProteinQuery({
  isEdit,
  currentStep,
  stageId,
  state,
  handleChange,
  disable,
  jobConfig,
  pipeline,
  setPipeline,
}: Props) {
  const { getValues, watch } = useFormContext();

  const currentSubMethod =
    watch(`tool_${Steps[currentStep]}`) ?? pipeline[currentStep].subMethod;

  // update pipeline
  useEffect(() => {
    const updatedPipeline = [...pipeline];
    updatedPipeline[currentStep].subMethod = currentSubMethod;
    setPipeline(updatedPipeline);
  }, [currentSubMethod]);

  const HelperTextWithInputProtein = (
    <HelperText
      currentSubMethod={currentSubMethod}
      jobConfig={jobConfig}
      step={currentStep + 1}
      stepsFormat={Steps}
    >
      <div className="flex rounded-lg border border-pep-gray-border space-x-3 font-light items-center p-3 h-[70px] min-h-fit">
        <Icon
          icon="hugeicons:dna"
          className="size-6 min-w-6 min-h-6 text-pep-gray"
        />
        <label className="text-center text-nowrap">Input Protein:</label>
        <div className="grow truncate">
          {createJobConfig["Protein Input"].description}
        </div>
      </div>
    </HelperText>
  );

  return (
    <div className="space-y-11">
      <ContextWithHelperText
        title={Steps[currentStep]}
        helperText={HelperTextWithInputProtein}
        isConclusion={true}
        onEdit={isEdit}
        onEditChange={handleChange}
        isJobDetail={true}
        runTime={
          stageId > 0 ? formatTime(getValues("run_time.query")) : undefined
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
            jobValue={getValues(`options.${currentSubMethod.toLowerCase()}`)}
            isEdit={isEdit}
            disable={disable}
          />
        </div>
        {!isEdit && (
          <InputProtein
            isJobDetail={true}
            state={state}
            stage={stageId}
            onEdit={isEdit}
          />
        )}
      </ContextWithHelperText>

      {isEdit && (
        <InputProtein
          isJobDetail={true}
          state={state}
          stage={stageId}
          onEdit={isEdit}
        />
      )}
    </div>
  );
}
