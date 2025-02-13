import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../Button/Button";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect, useState } from "react";
import Textarea from "../InputField/InputField/Textarea";
import { useFormContext } from "react-hook-form";
import { LabManualInputTable } from "./LabInputTable";

export type ManualInputOverlayProps = {
  onClose: () => void;
  onConfirm: (data: { sequence: string; score: number }[]) => void;
};

export function ManualInput({
  setProteinVisible,
  isVisible,
  manualInputProps,
}: {
  setProteinVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  manualInputProps: ManualInputOverlayProps;
}) {
  const { onClose, onConfirm } = manualInputProps;
  const { watch } = useFormContext();
  const inputManual = watch("lab-result-manual");
  const inputProtein = watch("input_protein");
  const [data, setData] = useState<{ sequence: string; score: number }[]>([]);
  const [isError, setIsError] = useState({
    isValidate: true,
    errorMessage: "",
  });

  useEffect(() => {
    const $modalElement = document.querySelector(`manual-input`);
    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-10",
        closable: true,
      };

      modal = new Modal($modalElement, modalOptions);
      modal.show();
    }

    return () => {
      if (modal) {
        modal.hide();
      }
    };
  }, [isVisible]);

  const checkValidate = (data: { sequence: string; score: number }[]) => {
    // Regular expression for valid amino acid sequences
    const validSequenceRegex = /^(?!.*[BJOUXZ])[A-Z]+$/i;

    for (const { sequence, score } of data) {
      if (
        !sequence ||
        score == null ||
        isNaN(score) ||
        !validSequenceRegex.test(sequence) ||
        sequence.toUpperCase().includes("ATGC") ||
        (sequence !== sequence.toUpperCase() &&
          sequence !== sequence.toLowerCase())
      ) {
        return {
          isValidate: false,
          errorMessage: "Input format mismatch!",
        };
      }
    }

    return { isValidate: true, errorMessage: "" };
  };

  const handleAdd = () => {
    // Split the string into lines
    const lines = inputManual.trim().split("\n");

    // Map each line into an object with sequence and score
    const newData = lines.map((line: any) => {
      const [sequence, score] = line.split(",").map((item: any) => item.trim());
      return { sequence, score: parseFloat(score) };
    });

    const validation = checkValidate(newData);
    setIsError(validation);

    if (validation.isValidate) {
      setData(newData);
    }
  };

  return (
    isVisible && (
      <div
        id="manual-input"
        tabIndex={-1}
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50 mt-0"
      >
        <div className="space-y-5">
          <div className="flex bg-pep-blue-light opacity-100 px-8 py-5 gap-x-8 min-w-fit w-[90%] m-auto z-[70] text-center">
            <div className="grow place-items-start space-y-5 mt-14 bg-white p-3 rounded-xl h-fit">
              <div className="flex space-x-3">
                <Icon
                  icon="hugeicons:dna"
                  className="size-6 min-w-6 min-h-6 text-pep-gray"
                />
                <label className="font-light">Input:</label>
              </div>
              <div className="">
                <Textarea
                  id="lab-result-manual"
                  className={`!w-full !min-w-[500px] !min-h-[220px] ${
                    !isError.isValidate ? "!border-error" : ""
                  }`}
                  placeholder={`Protein Sequence, Score\nProtein Sequence, Score\nProtein Sequence, Score`}
                  additionalValidation={{
                    maxLength: {
                      value: 50,
                    },
                  }}
                />
                {!isError.isValidate && (
                  <span className="w-full flex text-right ml-auto text-sm font-light text-error">
                    {isError.errorMessage}
                  </span>
                )}
              </div>
              <Button
                id="add-input"
                buttonType="submit"
                type="button"
                text="Add"
                className="w-fit px-3 py-2 font-normal inline-flex whitespace-nowrap text-center gap-3 text-pep-dark-gray"
                onClick={handleAdd}
              >
                <Icon icon="basil:add-outline" className="size-6" />
              </Button>
            </div>
            <div className="space-y-8">
              <div className="flex space-x-2">
                <span className="text-pep-dark-gray font-normal">Total:</span>
                <span className="font-light text-pep-blue">
                  {data.length} sequences
                </span>
              </div>
              <LabManualInputTable
                setProteinVisible={setProteinVisible}
                inputProtein={inputProtein}
                data={data}
                setData={setData}
              />
            </div>
          </div>
          <div className="flex py-5 space-x-16 place-self-center">
            <Button
              id="cancel"
              buttonType="cancel"
              text="Cancel"
              className="w-[190px] min-w-fit"
              onClick={onClose}
            />
            <Button
              id="confirm"
              buttonType="next"
              text="Upload"
              className="w-[190px] min-w-fit font-light"
              onClick={() => onConfirm(data)}
            />
          </div>
        </div>
      </div>
    )
  );
}
