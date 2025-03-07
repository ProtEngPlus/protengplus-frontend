import { useEffect, useState } from "react";
import { MutationResultInterface, MutationResultSearchParams } from "../../../../commons/interfaces/Mutation.interface";
import MutationResultTable from "./MutationResultTable";
import { getAllMutationResults } from "../../../../commons/api/mutation";
import PageNumberDropDown from "./PageNumberDropDown";

export default function MutationProteinSequenceSection({
    mutationId,
}: {
    mutationId: string;
}) {
    const [mutationResults, setMutationResults] = useState<MutationResultInterface[]>([]);
    const [fetchMutationResults, setFetchMutationResults] = useState(false);
    const [isBookmarkOnly, setIsBookmarkOnly] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const refreshMutationResults = () => {
        setFetchMutationResults(true);
    }

    const handleBookmark = () => {
        setIsBookmarkOnly((prev) => !prev)
        setCurrentPage(1);
    }

    useEffect(() => {
        const params: MutationResultSearchParams = isBookmarkOnly
            ? { mutation_id: mutationId, is_bookmark: true }
            : { mutation_id: mutationId };

        getAllMutationResults(params)
            .then((response) => setMutationResults(response.data || []))
            .catch(console.error);

        setFetchMutationResults(false);
    }, [fetchMutationResults, mutationId, isBookmarkOnly]);

    return (
        <div className="space-y-6 relative">
            <div className="space-y-6 px-5 py-6 font-light rounded-lg h-fit bg-gray-50 drop-shadow-md w-full flex justify-center">
                <div className="w-4/5 space-y-4">
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-md border-pep-blue border"
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
                        setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>
    )
}