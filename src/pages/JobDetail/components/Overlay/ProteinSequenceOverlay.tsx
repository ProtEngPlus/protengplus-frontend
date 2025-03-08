import { Icon } from "@iconify/react";

export type ProteinSequenceProps = {
  onClose: () => void;
};

export function ProteinSequenceOverlay({
  isVisible,
  proteinSequenceProps,
  proteinSequence,
  mutationPositions,
}: {
  isVisible: boolean;
  proteinSequenceProps: ProteinSequenceProps;
  proteinSequence: string;
  mutationPositions: string[];
}) {
  const { onClose } = proteinSequenceProps;

  return (
    isVisible && (
      <div
        id="#protein-sequence-modal"
        className="fixed top-0 right-0 left-0 z-[90] flex justify-center items-center w-full h-full bg-gray-900/50 mt-0"
      >
        <div className="space-y-5 place-items-center place-self-center w-[55%] place-content-center">
          <div className="bg-pep-blue-light opacity-100 px-5 py-8 m-auto z-[100] space-y-8 rounded-lg">
            <div className="items-start">
              <Icon
                icon="streamline:delete-1-solid"
                className="text-error size-5 self-center cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="flex space-x-3 place-self-center items-center">
              <Icon icon="hugeicons:dna" className="text-gray-400" width="30" height="30" />
              <span className="text-2xl text-pep-dark-gray font-normal">
                Protein Sequence
              </span>
            </div>

            <div className="bg-white rounded-lg p-8 gap-x-3 gap-y-4 font-light mx-6">
              <div className="space-y-4 flex flex-col items-center">
                {mutationPositions.length > 0 && (
                  <div className="text-gray-500 cursor-pointer">
                    [{mutationPositions.join(", ")}]
                  </div>
                )}
                <div className="items-left w-[90%] border border-pep-gray-border rounded-lg p-4 break-all leading-7">
                  {proteinSequence}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
