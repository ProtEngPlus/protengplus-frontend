import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useEffect } from "react";
import Button from "../../../../commons/components/Button/Button";
import { downloadMutationResults } from "../../../../commons/api/mutation";

export type ExportMutationResultOverlayProps = {
    id: string;
    onClose: () => void;
    title: string;
    message: string;
    mutationId: string;
};

export function ExportMutationResultOverlay({
    isVisible,
    exportProps,
}: {
    isVisible: boolean;
    exportProps: ExportMutationResultOverlayProps;
}) {
    const { id, onClose, title, message, mutationId } = exportProps;

    const handleExportMutationResult = async (isBookmarkOnly: boolean) => {
        if (!isBookmarkOnly) {
            try {
                const response = await downloadMutationResults(mutationId);
                console.log(response);

                // Create a Blob from the CSV response
                const blob = new Blob([response], { type: "text/csv" });

                // Create a temporary download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `mutaiton_results_${mutationId}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading CSV:", error);
            }
        }
    };

    useEffect(() => {
        const $modalElement = document.querySelector(`${id}`);
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
                tabIndex={-1}
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50"
            >
                <div className="modal-container max-w-[700px] w-fit bg-white opacity-100 border border-pep-gray-border rounded-lg px-10 py-8 space-y-11 m-auto shadow-dropShadow z-[100] text-center" id={`${id}`}>
                    <div className="modal-content">
                        <h1 className="leading-loose pb-2">{title}</h1>
                        <div className="bg-pep-blue rounded-md w-[90px] h-[3px] mx-auto mb-6" />
                        <label className="font-light text-sm leading-6">{message}</label>
                    </div>
                    <div className="flex flex-row space-x-4 place-content-center">
                        <Button
                            id="export-bookmark"
                            type="button"
                            buttonType="submit"
                            text="Export Bookmark"
                            className="w-[190px] min-w-fit !font-light"
                            onClick={onClose}
                        />
                        <Button
                            id="export-all"
                            type="button"
                            buttonType="submit"
                            text="Export All"
                            className="w-[190px] min-w-fit !font-light"
                            onClick={() => handleExportMutationResult(false)}
                        />
                    </div>
                </div>
            </div>
        )
    );
}
