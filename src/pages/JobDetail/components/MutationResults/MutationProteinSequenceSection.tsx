import { useEffect, useState } from "react";
import { MutationResultInterface, MutationResultSearchParams } from "../../../../commons/interfaces/Mutation.interface";
import MutationResultTable from "./MutationResultTable";
import { getAllMutationResults } from "../../../../commons/api/mutation";
import PageNumberDropDown from "./Input/PageNumberDropDown";
import { ProteinSequenceOverlay, ProteinSequenceProps } from "../Overlay/ProteinSequenceOverlay";
import SortOptionDropdown from "./Input/SortOptionDropDown";
import ScoreDropDown from "./Input/ScoreDropDown";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function MutationProteinSequenceSection({
    mutationId,
    inputProtein,
}: {
    mutationId: string;
    inputProtein: string;
}) {
    const [mutationResults, setMutationResults] = useState<MutationResultInterface[]>([]);
    const [isProteinSequenceVisible, setIsProteinSequenceVisible] = useState(false);
    const [currentMutationResult, setCurrentMutationResult] = useState<MutationResultInterface>();
    const [fetchMutationResults, setFetchMutationResults] = useState(false);
    const [isBookmarkOnly, setIsBookmarkOnly] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("assay_score");
    const [valuemin, setValueMin] = useState(-2);
    const [valuemax, setValueMax] = useState(2);
    const [isOrDescending, setIsOrDescending] = useState(true);

    const dropdownItems: { text: string; value: string }[] = [
        { text: "Score", value: "assay_score" },
    ];

    const refreshMutationResults = () => {
        setFetchMutationResults(true);
    }

    const handleBookmark = () => {
        setIsBookmarkOnly((prev) => !prev)
        setCurrentPage(1);
    }

    const proteinSequenceProps: ProteinSequenceProps = {
        onClose: () => {
            setIsProteinSequenceVisible(false);
        }
    };

    useEffect(() => {
        const params: MutationResultSearchParams = {
            mutation_id: mutationId,
            sort: sortBy,
            min_value: valuemin,
            max_value: valuemax,
            order: isOrDescending ? "desc" : "asc",
            ...(isBookmarkOnly ? { is_bookmark: true } : {}),
        };

        getAllMutationResults(params)
            .then((response) => setMutationResults(response.data || []))
            .catch(console.error);

        setFetchMutationResults(false);
    }, [fetchMutationResults, mutationId, isBookmarkOnly, valuemin, valuemax, sortBy, isOrDescending]);

    useEffect(() => {
        if (valuemin > valuemax) {
            const temp = valuemax;
            setValueMax(valuemin);
            setValueMin(temp);
        }
    }, [valuemin, valuemax]);

    return (
        <div className="space-y-6 relative">
            <ProteinSequenceOverlay
                isVisible={isProteinSequenceVisible}
                proteinSequenceProps={proteinSequenceProps}
                proteinSequence={currentMutationResult?.protein_sequence || ""}
                mutationPositions={currentMutationResult?.mutation_positions || []} />
            <div className="space-y-8 px-6 py-8 font-light rounded-lg h-fit bg-gray-50 drop-shadow-md w-full flex flex-col items-center">
                <div className="flex justify-between w-full items-start gap-6">
                    <div className="flex justify-start gap-3 items-center pt-2">
                        <div onClick={() => setIsOrDescending(!isOrDescending)} className="cursor-pointer">
                            {isOrDescending ? (
                                <Icon icon="ph:sort-ascending-bold" className="text-pep-blue" width="30" height="30" />
                            ) : (
                                <Icon icon="ph:sort-descending-bold" className="text-pep-blue" width="30" height="30" />
                            )}
                        </div>
                        <Icon icon="ic:baseline-sort" className="text-gray-400" width="24" height="24" />
                        <SortOptionDropdown sortBy={sortBy} setSortBy={setSortBy} dropdownItems={dropdownItems} />
                        <ScoreDropDown label={dropdownItems.find((item) => item.value === sortBy)?.text + ':' || "Score:"} value={valuemin} setValue={setValueMin} />
                        <ScoreDropDown label="to" value={valuemax} setValue={setValueMax} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <div className="font-normal flex gap-1 items-center">
                            <Icon icon="hugeicons:dna" className="text-gray-400" width="30" height="30" />
                            Input Protein
                        </div>
                        <div className="bg-pep-blue font-light rounded-lg p-1 text-white break-all">
                            {inputProtein}
                        </div>
                    </div>
                </div>
                <div className="w-4/5 space-y-4">
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-md border-pep-blue border cursor-pointer"
                                checked={isBookmarkOnly}
                                onChange={handleBookmark} />
                            <div className="text-md font-normal text-gray-500">show bookmark only</div>
                        </div>
                        <PageNumberDropDown itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} setCurrentPage={setCurrentPage} />
                    </div>
                    <MutationResultTable
                        mutationResults={mutationResults}
                        refresh={refreshMutationResults}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setIsProteinSequenceVisible={setIsProteinSequenceVisible}
                        setCurrentMutationResult={setCurrentMutationResult}
                    />
                </div>
            </div>
        </div>
    )
}