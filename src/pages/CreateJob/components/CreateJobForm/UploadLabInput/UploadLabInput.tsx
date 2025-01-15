import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { steps } from "../../../../../commons/configs/createJobConfig";
import { LabInputTable } from "./LabInputTable";
import Button from "../../../../../commons/components/Button/Button";
import editIcon from "../../../../../assets/images/CreateJob/editIcon.svg";
import onEditIcon from "../../../../../assets/images/CreateJob/onEditIcon.svg";
import { useFormContext } from "react-hook-form";
import Papa, { ParseResult } from "papaparse";
import { ManualInput, ManualInputOverlayProps } from "./ManualInputOverlay";
import {
  InputProteinOverlay,
  InputProteinOverlayProps,
} from "./InputProteinOverlay";
import {
  ConfirmOverlay,
  ConfirmOverlayProps,
} from "../../../../../commons/components/ModalOverlay/ConfirmOverlay";
import { ExportToCsv } from "../../../services/ExportToCsv";

const exampleLabResult: { sequence: string; score: number }[] = [
  {
    sequence: "ASIQHFHW",
    score: 0.002914,
  },
  {
    sequence: "CSIQHFHW",
    score: 0.00302,
  },
  {
    sequence: "DSIQHFHW",
    score: 0.002219,
  },
  {
    sequence: "ESIQHFHW",
    score: 0.004379,
  },
];

interface Props {
  initialStep: number;
  state: number;
  isConclusion?: boolean;
  onEdit?: boolean;
}

export default function UploadLabInput({
  initialStep,
  state,
  isConclusion = false,
  onEdit = true,
}: Props) {
  const { setValue, watch, getValues } = useFormContext();

  const train_batch_sizes = getValues(`Top Model.RidgeCV.train_batch_sizes`)[0];
  const labResultForm = watch("lab_result");
  const inputProtein = watch("input_protein");

  const [isRead, setRead] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [isEdit, setEdit] = useState(onEdit);
  const [isView, setView] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState<{
    isValidate: boolean;
    errorMessage: string;
  }>({ isValidate: true, errorMessage: "" });
  const [labResult, setLabResult] = useState<
    { sequence: string; score: number }[]
  >(labResultForm || []);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  function checkValidate(data: { sequence: string; score: number }[]): {
    isValidate: boolean;
    errorMessage: string;
  } {
    // Regular expression for valid amino acid sequences
    const validSequenceRegex = /^(?!.*[BJOUXZ])[A-Z]+$/i;

    if (data.length < train_batch_sizes) {
      return {
        isValidate: false,
        errorMessage: `Total sequences should match minimum training batch size !\nMinimum training batch size can be modify in Step-4 “Top Model”`,
      };
    }

    for (const { sequence, score } of data) {
      // Check for null or undefined values
      if (!sequence || score == null) {
        return {
          isValidate: false,
          errorMessage: "Uploaded file mismatch !",
        };
      }

      // Check if score is a valid number
      if (isNaN(score)) {
        return {
          isValidate: false,
          errorMessage: "Uploaded file mismatch !",
        };
      }

      // Check if the sequence matches the valid regex
      if (!validSequenceRegex.test(sequence)) {
        return {
          isValidate: false,
          errorMessage: "Uploaded file mismatch !",
        };
      }

      // Check for forbidden substring "ATGC"
      if (sequence.toUpperCase().includes("ATGC")) {
        return {
          isValidate: false,
          errorMessage: "Uploaded file mismatch !",
        };
      }

      // Check for uniform case (all uppercase or all lowercase)
      if (
        sequence !== sequence.toUpperCase() &&
        sequence !== sequence.toLowerCase()
      ) {
        return {
          isValidate: false,
          errorMessage: "Uploaded file mismatch !",
        };
      }
    }

    // If all validations pass
    return {
      isValidate: true,
      errorMessage: "",
    };
  }

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        delimiter: ",",
        complete: (results: ParseResult<string[]>) => {
          const fileData = results.data.map((line: any) => {
            return { sequence: line[1], score: line[2] };
          });
          const validation = checkValidate(fileData);
          setIsError(validation);

          if (validation.isValidate) {
            setValue("file_name", file.name);
            setValue("lab_result", fileData);
            setLabResult(fileData);
          }
        },
      });
    }
  }, [file]);

  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const ConfirmProps: ConfirmOverlayProps = {
    id: "confirm-manual-input",
    onClose: () => {
      setConfirmVisible(false);
    },
    onConfirm: async () => {
      setConfirmVisible(false);
      setManualInputVisible(true);
      try {
        // setSuccessVisible(true);
      } catch (error) {
        console.error(error);
      }
    },
    title: "Do you want to discard current uploaded file?",
    message:
      "The current uploaded file will be permanently removed and cannot be recovered",
  };

  const [isManualInputVisible, setManualInputVisible] = useState(false);
  const ManualInputProps: ManualInputOverlayProps = {
    onClose: () => {
      setManualInputVisible(false);
    },
    onConfirm: async (data: { sequence: string; score: number }[]) => {
      setIsError(checkValidate(data));
      if (isError.isValidate) {
        setValue("file_name", "Manual Input");
        setValue("lab_result", data);
        setLabResult(data);
      }
      setManualInputVisible(false);
    },
  };

  const [isProteinVisible, setProteinVisible] = useState(false);
  const InputProteinProps: InputProteinOverlayProps = {
    inputProtein: inputProtein,
    onClose: () => {
      setProteinVisible(false);
    },
  };

  return (
    <div className="space-y-2">
      <ConfirmOverlay
        confirmProps={ConfirmProps}
        isVisible={isConfirmVisible}
      />
      <InputProteinOverlay
        isVisible={isProteinVisible}
        inputProteinProps={InputProteinProps}
      />
      <ManualInput
        setProteinVisible={setProteinVisible}
        isVisible={isManualInputVisible}
        manualInputProps={ManualInputProps}
      />
      {!isConclusion && (
        <div className="space-y-6 font-light">
          <div className="flex border-l-4 border-pep-orange px-6 font-light text-xl">
            Lab Input Template
          </div>
          <hr />
          <div className="flex justify-between space-x-4">
            <Icon
              icon={isExpand ? "mingcute:up-line" : "mingcute:down-line"}
              onClick={() => setIsExpand(!isExpand)}
              className="cursor-pointer text-pep-gray size-[30px]"
            />
            <div className="flex items-center space-x-2">
              <span>Download CSV</span>
              <div className="bg-pep-orange rounded-full p-[5px] cursor-pointer">
                <Icon
                  icon="heroicons-outline:download"
                  className="text-white size-[30px]"
                  onClick={() => ExportToCsv(labResult)}
                />
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-pep-blue-light p-5 text-pep-dark-gray">
            <div>
              {isExpand
                ? LabInputTable(
                    true,
                    inputProtein,
                    exampleLabResult,
                    setProteinVisible
                  )
                : "Click expand to see full template"}
            </div>
          </div>
        </div>
      )}
      <div className="space-y-6 font-light">
        <div className="w-[353px] min-w-fit flex justify-between border-l-4 border-pep-orange px-6 font-light text-xl gap-x-5">
          {steps[state - 1]}
          <Icon
            icon="material-symbols:info-outline"
            className={`size-8 cursor-pointer ${
              isRead ? "text-pep-blue" : "text-pep-gray"
            }
           
            `}
            onClick={() => setRead(!isRead)}
          />
          {isConclusion && (
            <img
              src={isEdit ? onEditIcon : editIcon}
              alt="edit"
              className="size-8 cursor-pointer"
              onClick={() => setEdit(!isEdit)}
            />
          )}
        </div>
        <hr />
        <div className="relative space-y-8">
          <div className="flex justify-between space-x-5 place-items-center">
            {!isError.isValidate ? (
              <div className="text-error flex flex-row items-center space-x-[10px]">
                <div>*</div>
                <div
                  className="text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: isError.errorMessage.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
            ) : labResult.length === 0 ? (
              <div>Please upload your lab input</div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon
                  icon="heroicons:paper-clip-20-solid"
                  className="text-pep-gray size-5"
                />
                <div>{getValues("file_name")}</div>
              </div>
            )}

            {isEdit ? (
              <div className="flex space-x-5">
                {/* --------------------------------Upload lab Button------------------------------------ */}
                <div>
                  <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    id="upload-lab-input"
                    type="button"
                    buttonType="submit"
                    text="Upload"
                    className="w-fit font-normal inline-flex items-center whitespace-nowrap place-content-center text-center gap-2 !px-2"
                    onClick={handleButtonClick}
                    disabled={initialStep > state}
                  >
                    <Icon icon="uil:upload" className="size-5" />
                  </Button>
                </div>

                {/* -------------------------------------Manual input Button----------------------------------------- */}
                <Button
                  id="upload-lab-input-manual"
                  type="button"
                  buttonType="submit"
                  text="Manual Input"
                  className={`w-fit font-normal inline-flex items-center whitespace-nowrap place-content-center text-center gap-2 !px-2`}
                  disabled={initialStep > state}
                  onClick={() => setConfirmVisible(true)}
                >
                  <Icon
                    icon="material-symbols-light:keyboard-external-input-rounded"
                    className="size-5"
                  />
                </Button>
              </div>
            ) : (
              <Button
                id="btn-view-protein"
                buttonType="cancel"
                type="button"
                text="View"
                className="w-fit px-3 py-2 font-normal inline-flex items-center whitespace-nowrap place-content-center text-center gap-3 text-pep-dark-gray"
                onClick={() => {
                  setView(!isView);
                }}
              >
                <Icon
                  icon="carbon:view"
                  className="size-[30px] text-pep-gray"
                />
              </Button>
            )}
          </div>

          {/*----------------------------------- Lab Input Table --------------------------------------------*/}
          {isEdit && labResult.length !== 0 && isError.isValidate && (
            <div className="rounded-lg p-5 bg-pep-blue-light place-items-center">
              <div className="w-[738px] space-y-8">
                <div className="flex space-x-2">
                  <span className="text-pep-dark-gray font-normal">Total:</span>
                  <span className="font-light text-pep-blue">
                    {labResult.length} sequences
                  </span>
                </div>
                <div>
                  {LabInputTable(
                    false,
                    inputProtein,
                    labResult,
                    setProteinVisible
                  )}
                </div>
              </div>
            </div>
          )}

          {/*------------------------------------- Helper Text -------------------------------------------------*/}
          {isRead && (
            <div className="absolute inset-0 translate-y-[-35px] rounded-lg p-5 z-10 bg-pep-blue-light min-h-fit">
              <div className="flex space-x-3">
                <Icon icon="ep:setting" className="text-pep-gray size-6" />
                <label>Parameter Setup</label>
              </div>
              <div className="flex flex-row mt-4 space-x-5  text-pep-dark-gray place-items-center">
                <span className="text-nowrap">Upload Lab Result:</span>
                <span className="leading-10">
                  Upload your lab results with the experimented protein
                  sequences and their scores. This data will be used to train
                  the model for low-n engineering
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
