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

interface Props {
  isEdit: boolean;
  currentStep: number;
  currentSubMethod: string;
  handleChange: () => void;
  disable: boolean;
  jobConfig: {
    formatInput: number;
    description: string;
    parameters: MethodParameter[];
  };
}

export default function Mutation({
  isEdit,
  currentStep,
  currentSubMethod,
  handleChange,
  disable,
  jobConfig,
}: Props) {
  const { getValues } = useFormContext();

  const HelperTextMethod = (
    <HelperText
      currentSubMethod={currentSubMethod}
      jobConfig={jobConfig}
      step={currentStep}
      stepsFormat={Steps}
    />
  );
  return (
    <div className="space-y-11">
      <ContextWithHelperText
        title={Steps[currentStep - 1]}
        helperText={HelperTextMethod}
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
            jobConfig={jobConfig}
            jobValue={getValues(`options.${currentSubMethod.toLowerCase()}`)}
            isEdit={isEdit}
            disable={disable}
          />
        </div>
      </ContextWithHelperText>
    </div>
  );
}
