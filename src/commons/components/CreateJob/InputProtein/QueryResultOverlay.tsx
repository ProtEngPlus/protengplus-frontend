import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import QueryResultTable from "./QueryResultTable";

export type QueryResultOverlayProps = {
  jobId: string;
  inputProtein: string;
  onClose: () => void;
};

export function QueryResultOverlay({
  isVisible,
  queryResultProps,
}: {
  isVisible: boolean;
  queryResultProps: QueryResultOverlayProps;
}) {
  const { jobId, inputProtein, onClose } = queryResultProps;

  useEffect(() => {
    const $modalElement = document.querySelector("query-result-modal");

    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses: "bg-gray-900/50 fixed inset-0 z-10",
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
        id="query-result-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full bg-gray-900/50 mt-0"
      >
        <div className="space-y-5 place-items-center place-self-center overflow-y-auto h-[80%] w-[90%] place-content-center text-center">
          <div className="bg-pep-blue-light opacity-100 px-5 py-8 m-auto z-[100]">
            <Icon
              icon="streamline:delete-1-solid"
              className="size-5 text-error cursor-pointer"
              onClick={onClose}
            />
            <div className="p-5 space-y-8">
              <div className="flex place-content-center items-center space-x-3 place-self-center">
                <Icon
                  icon="hugeicons:dna"
                  className="size-[30px] min-w-[30px] text-pep-gray"
                />
                <label className="text-pep-dark-gray text-nowrap">
                  Protein Sequence:
                </label>
                <div className="w-full break-all text-start">
                  {inputProtein}
                </div>
              </div>
              <QueryResultTable
                isJobDetail={true}
                jobId={jobId}
                disable={true}
                isOverlay={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
