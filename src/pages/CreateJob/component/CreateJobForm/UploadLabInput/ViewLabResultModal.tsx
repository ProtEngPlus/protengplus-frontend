import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import { LabInputTable } from "../../../../../commons/components/CreateJob/UploadLabInput/LabInputTable";

export type ViewLabResultOverlayProps = {
  fileName: string;
  inputProtein: string;
  labResult: { sequence: string; score: number }[];
  onClose: () => void;
};

export function ViewLabResult({
  isVisible,
  viewLabResultProps,
}: {
  isVisible: boolean;
  viewLabResultProps: ViewLabResultOverlayProps;
}) {
  const { fileName, inputProtein, labResult, onClose } = viewLabResultProps;

  useEffect(() => {
    const $modalElement = document.querySelector("lab-result-modal");

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

  return (
    isVisible && (
      <div
        id="lab-result-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full bg-gray-900/50 mt-0"
      >
        <div className="space-y-5 place-items-center place-self-center w-[1085px] place-content-center text-center">
          <div className="bg-pep-blue-light opacity-100 px-5 py-8 m-auto z-[100] space-y-8">
            <Icon
              icon="streamline:delete-1-solid"
              className="size-5 text-error cursor-pointer"
              onClick={onClose}
            />
            <div className="w-[738px] space-y-8 place-self-center mx-auto">
              <div className="flex items-center space-x-2">
                <Icon
                  icon="heroicons:paper-clip-20-solid"
                  className="text-pep-gray size-5"
                />
                <div>{fileName}</div>
              </div>
              <div className="flex space-x-2 text-start">
                <span className="text-pep-dark-gray font-normal">Total:</span>
                <span className="font-light text-pep-blue">
                  {labResult.length} sequences
                </span>
              </div>
              <LabInputTable
                data={labResult}
                isExample={false}
                inputProtein={inputProtein}
                isForConclusion={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
