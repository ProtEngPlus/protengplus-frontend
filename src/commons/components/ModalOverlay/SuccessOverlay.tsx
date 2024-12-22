import successIcon from "../../../assets/images/ModalOverlay/successIcon.svg";
import Button from "../Button/Button";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";

export type SuccessOverlayProps = {
  id: string;
  onClose: () => void;
  title: string;
};

export function SuccessOverlay({
  isVisible,
  successProps,
}: {
  isVisible: boolean;
  successProps: SuccessOverlayProps;
}) {
  const { id, onClose, title } = successProps;

  useEffect(() => {
    const $modalElement = document.querySelector(`#success-modal-${id}`);
    let modal: ModalInterface | null = null;

    if ($modalElement instanceof HTMLElement && isVisible) {
      const modalOptions: ModalOptions = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-10",
        closable: true,
        onHide: () => console.log("Confirm modal is hidden"),
        onShow: () => console.log("Confirm modal is shown"),
      };

      modal = new Modal($modalElement, modalOptions);
      modal.show();
    }

    return () => {
      if (modal) {
        modal.hide(); // Hide the modal if it was instantiated
      }
    };
  }, [isVisible]);

  return (
    isVisible && (
      <div
        id={`#success-modal-${id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
      >
        <div className="modal-container bg-white space-y-9 rounded-lg px-8 py-5 w-fit m-auto shadow-dropShadow z-[100 text-center]">
          <img src={successIcon} alt="Success Icon" className="mx-auto" />
          <h1 className="leading-loose">{title}</h1>
          <div className="flex justify-center">
            <Button
              id="accept"
              buttonType="cancel"
              text="Accept"
              className="w-[190px] min-w-fit"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    )
  );
}
