import { PipelineItem } from "../../../../../commons/interfaces/CreateJob.interface";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import Context from "../../../../../commons/components/CreateJob/Context/Context";
import ContextWithHelperText from "../../../../../commons/components/CreateJob/Context/ContextWithHelperText";
import {
  createJobConfig,
  formatInput,
  steps,
} from "../../../../../commons/configs/createJobConfig";
import { Icon } from "@iconify/react";
import TextInput from "../../../../../commons/components/Input/TextInput";
import Textarea from "../../../../../commons/components/CreateJob/InputField/Textarea";
import InputField from "../../InputField/InputField";
import DropdownInput from "../../../../../commons/components/CreateJob/InputField/Dropdown";
import SearchInput from "../../../../../commons/components/CreateJob/InputField/SearchInput";
import Button from "../../../../../commons/components/Button/Button";

interface Props {
  initialStep: number;
  state: number;
  errors: any;
  pipeline: PipelineItem[];
  setPipeline: (p: PipelineItem[]) => void;
  isConclusion?: boolean;
  onEditInfo?: boolean;
  onEditProt?: boolean;
}

export default function ProteinQuery({
  initialStep,
  state,
  errors,
  pipeline,
  setPipeline,
  isConclusion,
  onEditInfo = true,
  onEditProt = true,
}: Props) {
  const { getValues, setValue, watch } = useFormContext();
  const currentSubMethod = watch(`tool_${steps[state - 1]}`);
  const inputProtein = watch("input_protein");
  const input_mode = watch("input_mode") ?? "prot_seq";

  // isEdit (for conclusion step)
  const [isEditInfo, setEditInfo] = useState(onEditInfo);
  const [isEditProt, setEditProt] = useState(onEditProt);

  // update pipeline
  useEffect(() => {
    const updatedPipeline = [...pipeline];
    updatedPipeline[state - 1].subMethod = currentSubMethod;
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
              disable={initialStep > state}
              onEdit={isEditProt}
              additionalValidation={
                initialStep > state ? undefined : value.additionalValidation
              }
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
              disable={initialStep > state}
              onEdit={isEditProt}
              additionalValidation={
                initialStep > state ? undefined : value.additionalValidation
              }
            />
          )
        )}
      </div>
    );
  }, [jobConfig, isEditProt]);

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
      </div>
    );
  }, [jobConfig]);

  return (
    <div className="space-y-11">
      {/* --------------------------------- Job detail ----------------------------------------------------------------- */}
      <Context
        title="General"
        isConclusion={isConclusion}
        onEdit={isEditInfo}
        onEditChange={() => setEditInfo(!isEditInfo)}
      >
        <div className="grid grid-cols-[10.625rem_31.25rem] gap-5">
          <div className="flex flex-row gap-x-3 items-center">
            {errors.name && <span className="text-red-500">*</span>}
            <Icon
              icon="ph:pencil-simple-line"
              className="text-gray-400 size-6"
            />
            <label>Job Name:</label>
          </div>

          <TextInput
            id="name"
            placeholder="Job Name*"
            additionalValidation={{
              required: { value: true },
            }}
            onEdit={isEditInfo}
          />

          <div className="flex flex-row gap-x-3 items-start">
            <Icon icon="ph:note" className="text-gray-400 size-6" />
            <label>Job Description:</label>
          </div>

          <Textarea
            id="description"
            placeholder="Job Description"
            additionalValidation={{
              maxLength: {
                value: 50,
              },
            }}
            onEdit={isEditInfo}
          />
        </div>
      </Context>
      <div>
        {/* --------------------------------- Protein query ----------------------------------------------------------------- */}
        <ContextWithHelperText
          title={steps[state - 1]}
          helperText={helperText}
          isConclusion={isConclusion}
          onEdit={isEditProt}
          onEditChange={() => setEditProt(!isEditProt)}
        >
          <div className="space-y-4">
            {/* Select SubMethod's Tool */}
            <DropdownInput
              id={`tool_${steps[state - 1]}`}
              label="Tool"
              defaultValue={currentSubMethod}
              options={Object.keys(
                createJobConfig[steps[state - 1]]?.tool ?? {}
              )}
              onEdit={isEditProt}
              disabled={initialStep > state}
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
          <div className="space-y-2">
            {inputFields}

            {/* --------------------------------- Protein input (view mode) ----------------------------------------------------------------- */}
            {isConclusion && !isEditProt && (
              <div className="flex rounded-lg border-pep-gray-border space-x-3 font-light items-center">
                <Icon
                  icon="hugeicons:dna"
                  className="size-6 min-w-6 min-h-6 text-pep-gray"
                />
                <label className="text-center text-nowrap">Input Protein</label>
                <div className="grow truncate w-[40px]">{inputProtein}</div>
                <Button
                  id="btn-view-protein"
                  buttonType="cancel"
                  type="button"
                  text="View"
                  className="w-fit px-3 py-2 font-normal inline-flex items-center whitespace-nowrap place-content-center text-center gap-3 text-pep-dark-gray"
                  onClick={() => {
                    console.log("view protein input");
                  }}
                >
                  <Icon
                    icon="carbon:view"
                    className="size-[30px] text-pep-gray"
                  />
                </Button>
                <div className="flex items-center space-x-2 font-light">
                  <span>Download CSV</span>
                  <div className="bg-pep-orange rounded-full p-[5px] cursor-pointer">
                    <Icon
                      icon="heroicons-outline:download"
                      className="text-white size-[30px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ContextWithHelperText>

        {/* --------------------------------- Protein input (edit mode) ----------------------------------------------------------------- */}
        {isEditProt && (
          <div
            className={`flex mt-12 bg-pep-blue-light rounded-lg border-pep-gray-border p-3 space-x-3 items-center place-content-center font-light ${
              errors.input_protein && "pb-6"
            }`}
          >
            <Icon icon="hugeicons:dna" className="size-6 text-pep-gray" />
            <label className="text-center text-nowrap">Input Protein</label>
            <div className="grow">
              <SearchInput
                id="input_protein"
                placeholder="Input Protein*"
                className="text-wrap"
                disabled={initialStep > state}
                additionalValidation={{
                  required: {
                    value: true,
                    message: "Protein input is required",
                  },
                  pattern: {
                    value:
                      /^(?!.*ATGC)(?!.*atgc)[A-IK-NP-TVWY]*$|^(?!.*ATGC)(?!.*atgc)[a-ik-np-tvwy]*$/,
                    message: "Incorrect protein sequence format.",
                  },
                }}
              />
              {/* Error Message */}
              {errors.input_protein && (
                <span className="absolute font-light text-error text-xs">
                  {errors.input_protein.message}
                </span>
              )}
            </div>
            <Button
              type="button"
              buttonType={input_mode === "prot_seq" ? "submit" : "cancel"}
              onClick={() => setValue("input_mode", "prot_seq")}
              id="prot_seq"
              text="Amino Acid Sequence"
              className="!font-light !p-0 w-[100px] text-sm"
            />
            <Button
              buttonType={input_mode === "uniprot_id" ? "submit" : "cancel"}
              onClick={() => setValue("input_mode", "uniprot_id")}
              type="button"
              id="uniprot_id"
              text="UniprotID"
              className="!font-light !p-0 w-[100px] text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
