import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import InputProteinTable, { ResultProps } from "./InputProteinTable";

export type ProteinWithTableOverlayProps = {
  onEdit: boolean;
  inputProtein: string;
  result: ResultProps[];
  onClose: () => void;
};

export function ProteinWithTableOverlay({
  isVisible,
  setFilterVisible,
  proteinWithTableProps,
}: {
  isVisible: boolean;
  setFilterVisible: (isFilterVisible: boolean) => void;
  proteinWithTableProps: ProteinWithTableOverlayProps;
}) {
  const { onEdit, inputProtein, result, onClose } = proteinWithTableProps;

  useEffect(() => {
    const $modalElement = document.querySelector("input-protein-modal");

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
        id="input-protein-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full bg-gray-900/50 mt-0"
      >
        <div className="space-y-5 place-items-center place-self-center w-fit place-content-center text-center">
          <div className="bg-pep-blue-light opacity-100 px-5 py-8 m-auto z-[100]">
            <Icon
              icon="streamline:delete-1-solid"
              className="size-5 text-error cursor-pointer"
              onClick={onClose}
            />
            <div className="p-5 space-y-8">
              <div className="flex place-content-center items-center space-x-3">
                <Icon
                  icon="hugeicons:dna"
                  className="size-[30px] text-pep-gray"
                />
                <label className="text-pep-dark-gray">Protein Sequence:</label>
                <label>{inputProtein}</label>
              </div>
              <InputProteinTable
                onEdit={onEdit}
                setFilterVisible={setFilterVisible}
                isOverlay={true}
                result={result}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
