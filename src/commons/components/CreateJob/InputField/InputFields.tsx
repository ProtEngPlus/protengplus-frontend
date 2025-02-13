import { formatInput, MethodParameter } from "../../../configs/createJobConfig";
import GetInputField from "./GetInputField";

export default function InputFields({
  jobValue,
  jobConfig,
  disable,
  isEdit,
}: {
  jobValue: Record<string, MethodParameter["default"]>;
  jobConfig: {
    formatInput: number;
    description: string;
    parameters: MethodParameter[];
  };
  disable?: boolean;
  isEdit: boolean;
}) {
  if (!jobConfig || !Array.isArray(jobConfig.parameters)) return null;

  const getFieldValue = (value: MethodParameter) => {
    if (value.type === "rangeNumber") {
      return {
        low: Number(jobValue[`${value.id}_low`]),
        high: Number(jobValue[`${value.id}_high`]),
      };
    }
    return jobValue[value.id];
  };

  return (
    <div
      className={
        formatInput[jobConfig.formatInput ?? 1]?.input ||
        "flex flex-row gap-x-[5%] gap-y-4 flex-wrap"
      }
    >
      {jobConfig.parameters.map((value) => (
        <GetInputField
          key={value.id}
          id={value.id}
          type={value.type}
          label={value.name}
          options={value.dropdownItems}
          value={getFieldValue(value)}
          disable={disable}
          onEdit={isEdit}
          additionalValidation={
            disable ? undefined : value.additionalValidation
          }
          formatInput={jobConfig.formatInput}
        />
      ))}
    </div>
  );
}
