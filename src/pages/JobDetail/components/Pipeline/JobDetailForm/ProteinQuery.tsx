import { useFormContext } from "react-hook-form";
import ContextWithHelperText from "../../../../../commons/components/CreateJob/Context/ContextWithHelper";
import DropdownInput from "../../../../../commons/components/CreateJob/InputField/InputField/Dropdown";
import InputFields from "../../../../CreateJob/component/CreateJobForm/ProteinQuery/InputField";
import InputProtein from "../../../../../commons/components/CreateJob/InputProtein/InputProtein";
import {
  createJobConfig,
  MethodParameter,
} from "../../../../../commons/configs/createJobConfig";
import { Steps } from "../../../../../commons/interfaces/Job.interface";
import HelperText from "../../../../../commons/components/CreateJob/InputField/HelperText";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

interface Props {
  isEdit: boolean;
  currentStep: number;
  stageId: number;
  currentSubMethod: string;
  handleChange: () => void;
  disable: boolean;
  jobConfig: {
    formatInput: number;
    description: string;
    parameters: MethodParameter[];
  };
}

export default function ProteinQuery({
  isEdit,
  currentStep,
  stageId,
  currentSubMethod,
  handleChange,
  disable,
  jobConfig,
}: Props) {
  const { getValues } = useFormContext();

  // detect input change for display query result Table
  const [isChange, setIsChange] = useState(false);

  const HelperTextWithInputProtein = (
    <HelperText
      currentSubMethod={currentSubMethod}
      jobConfig={jobConfig}
      step={currentStep}
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
        title={Steps[currentStep - 1]}
        helperText={HelperTextWithInputProtein}
        isConclusion={true}
        onEdit={isEdit}
        onEditChange={handleChange}
      >
        <div className="space-y-4">
          {/* Select SubMethod's Tool */}
          <DropdownInput
            id={`tool_${Steps[currentStep - 1]}`}
            label="Tool"
            defaultValue={currentSubMethod}
            options={Object.keys(
              createJobConfig[Steps[currentStep - 1]]?.tool ?? {}
            )}
            onEdit={isEdit}
            disabled={disable}
          />

          {/* SubMethod description */}
          {/* {!isConclusion && ( */}
          <div className="space-y-2 text-pep-dark-gray">
            <h1 className="text-2xl font-normal ">{currentSubMethod}</h1>
            <span className="text-sm font-light ">
              {createJobConfig[Steps[currentStep - 1]]?.tool[currentSubMethod]
                ? createJobConfig[Steps[currentStep - 1]]?.tool[
                    currentSubMethod
                  ].description
                : ""}
            </span>
            <hr />
          </div>
          {/* )} */}
        </div>

        {/* SubMethod's input */}
        <div className="space-y-2">
          <InputFields
            setIsChange={setIsChange}
            jobConfig={jobConfig}
            jobValue={getValues(`options.${currentSubMethod.toLowerCase()}`)}
            isEdit={isEdit}
            disable={disable}
          />
        </div>
        {!isEdit && (
          <InputProtein
            isChange={isChange}
            setIsChange={setIsChange}
            onEdit={isEdit}
            jobWithConfig={stageId > 1}
            initialStep={stageId}
            isConclusion={true}
          />
        )}
      </ContextWithHelperText>

      {isEdit && (
        <InputProtein
          isChange={isChange}
          setIsChange={setIsChange}
          onEdit={isEdit}
          jobWithConfig={stageId > 1}
          initialStep={stageId}
          isConclusion={true}
        />
      )}
    </div>
  );
}
