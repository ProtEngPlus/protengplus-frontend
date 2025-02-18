import { Icon } from "@iconify/react";
import Button from "../../Button/Button";
import { useFormContext } from "react-hook-form";
import DownloadCSVButton from "../../Button/DownloadCSVButton";
import ViewButton from "../../Button/ViewButton";
import searchIcon from "../../../../assets/images/CreateJob/searchIcon.svg";
import { useEffect, useState } from "react";
import { getUniProtId } from "../../../api/job";

interface Props {
  isChange: boolean;
  setIsChange: (isChange: boolean) => void;
  onEdit: boolean;
  initialStep: number;
  jobWithConfig?: boolean;
  isConclusion?: boolean;
}

export default function InputProtein({
  isChange,
  setIsChange,
  onEdit,
  jobWithConfig = true,
  initialStep,
  isConclusion = false,
}: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
    trigger,
  } = useFormContext();

  const inputProtein = watch("input_protein");
  const inputProteinField = watch("input_protein_field");
  const inputMode = watch("input_mode") ?? "prot_seq";
  const [isError, setIsError] = useState({
    isValidate: true,
    errorMessage: "",
  });

  useEffect(() => {
    if (inputMode === "prot_seq") {
      setValue("input_protein", getValues("input_protein_field"));
    }
    if (
      inputProteinField === getValues("initial_input_protein") &&
      inputMode === "prot_seq"
    ) {
      setIsChange(false);
    } else {
      setIsChange(true);
    }
  }, [inputProteinField, inputMode]);

  const getUniProt = async (inputId: string) => {
    const data = await getUniProtId(inputId);

    if (data.data) {
      setValue("input_protein", data.data.sequence);
      setIsError({ isValidate: true, errorMessage: "" });
    } else {
      setIsError({ isValidate: false, errorMessage: data.message });
    }
  };

  return (
    <div>
      {/* Add Protein Table Overlay & Query Result Filter Here */}
      <div className="space-y-12">
        {/* Header Section */}
        <div
          className={`space-y-3 rounded-lg border-pep-gray-border ${
            onEdit ? "bg-pep-blue-light p-5" : ""
          } `}
        >
          <div className="flex items-center space-x-3">
            <Icon
              icon="hugeicons:dna"
              className="size-6 text-pep-gray min-w-6"
            />
            <label className="text-center text-nowrap font-light">
              Input Protein
            </label>

            {/*---------------------------------------------- For Input Protein ---------------------------------------*/}

            <div className="grow">
              {onEdit ? (
                <div className="grow">
                  <div className="relative">
                    <input
                      id="input_protein_field"
                      disabled={initialStep > 2}
                      placeholder="Input Protein*"
                      className={`text-wrap h-[50px] w-full min-w-fit pl-3 pr-10 bg-white border font-light placeholder:text-placeholder rounded-md focus:border-pep-blue focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:border-disabled disabled:text-label ${
                        (errors.input_protein_field &&
                          inputMode === "prot_seq") ||
                        (!isError.isValidate && inputMode === "uniprot_id")
                          ? "border-error"
                          : "border-gray-border"
                      }`}
                      {...register("input_protein_field", {
                        validate:
                          inputMode === "prot_seq"
                            ? {
                                required: (value) =>
                                  !!value || "Protein input is required",
                                pattern: (value) =>
                                  /^(?:[A-IK-NP-TVWY]+|[a-ik-np-tvwy]+)$/.test(
                                    value
                                  ) || "Incorrect protein sequence format.",
                              }
                            : !isError.isValidate
                            ? () => isError.errorMessage
                            : undefined,
                      })}
                      onBlur={() => {
                        if (inputMode === "prot_seq") {
                          trigger("input_protein_field");
                        }
                      }}
                      autoComplete="off"
                    />

                    <img
                      src={searchIcon}
                      alt="search"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                        inputMode === "uniprot_id" &&
                        getUniProt(inputProteinField)
                      }
                    />
                  </div>
                  {errors.input_protein_field && inputMode === "prot_seq" ? (
                    <span className="absolute font-light text-error text-xs">
                      {typeof errors.input_protein_field.message === "string"
                        ? errors.input_protein_field.message
                        : ""}
                    </span>
                  ) : !isError.isValidate && inputMode === "uniprot_id" ? (
                    <span className="absolute font-light text-error text-xs">
                      {isError.errorMessage}
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className="break-all">{inputProteinField}</div>
              )}
            </div>

            {/*------------------------------------------------------ For Button  -------------------------------------------------*/}

            {onEdit ? (
              <div className="flex items-center space-x-3">
                <Button
                  disabled={initialStep > 2}
                  id="prot_seq"
                  buttonType={inputMode === "prot_seq" ? "submit" : "cancel"}
                  type="button"
                  onClick={() => setValue("input_mode", "prot_seq")}
                  text="Amino Acid Sequence"
                  className="!font-light !p-0 w-[100px] text-sm disabled:bg-pep-blue disabled:text-white"
                />
                <Button
                  disabled={initialStep > 2}
                  id="uniprot_id"
                  buttonType={inputMode === "uniprot_id" ? "submit" : "cancel"}
                  type="button"
                  onClick={() => {
                    setIsChange(true);
                    setValue("input_mode", "uniprot_id");
                  }}
                  text="UniprotID"
                  className="!font-light !p-0 w-[100px] text-sm disabled:bg-white !disabled:text-black"
                />
                <ViewButton
                  inputProtein={inputProtein}
                  disable={
                    (inputMode === "prot_seq" &&
                      (!!errors.input_protein_field ||
                        !watch("input_protein"))) ||
                    (inputMode === "uniprot_id" && !isError.isValidate) ||
                    !watch("input_protein")
                  }
                />
              </div>
            ) : !isChange && jobWithConfig ? (
              <div className="flex items-center space-x-3">
                <DownloadCSVButton />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {inputMode === "uniprot_id" && (
                  <ViewButton inputProtein={inputProtein} />
                )}
              </div>
            )}
          </div>
          {/*--------------------------- Input Protein Table -------------------------------*/}
        </div>
        {/* Note for Non-configurable Jobs - create job */}
        {!isConclusion && onEdit && (!jobWithConfig || isChange) && (
          <div className="text-center text-label font-light">
            Note: Blast Results can be manually filtered and selected only in{" "}
            <span className="text-pep-orange font-normal">'One-Step Run'</span>{" "}
            mode
          </div>
        )}
      </div>
    </div>
  );
}
