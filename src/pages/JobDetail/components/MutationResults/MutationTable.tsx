import { useState } from "react";
import { MutationInterface, MutationStateType } from "../../../../commons/interfaces/Mutation.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { updateMutationDetail } from "../../../../commons/api/mutation";
import editIcon from "../../../../assets/images/CreateJob/editIcon.svg";
import { RenameMutationOverlay, RenameMutationProps } from "../Overlay/RenameMutationOverlay";
import MutationState from "../../../../commons/components/Mutation/MutationState/MutationState";
import { getTotalTime } from "../../../Dashboard/service/getTotalTime";

const headers = [
    "Collection Name",
    "Status",
];

export default function MutationTable({
    mutations,
    refresh,
    currentMutation,
    setCurrentMutation,
    setIsSelectCollection,
    handleRunMutation,
    handleDelete,

}: {
    mutations: MutationInterface[];
    refresh: () => void;
    currentMutation: MutationInterface | null;
    setCurrentMutation: (mutation: MutationInterface) => void;
    setIsSelectCollection: (value: boolean) => void;
    handleRunMutation: (mutation: MutationInterface) => void;
    handleDelete: (mutation: MutationInterface) => void;
}) {
    const [isRenameMutationVisible, setIsRenameMutationVisible] = useState(false);

    const handleRename = (mutation: MutationInterface) => {
        setCurrentMutation(mutation);
        setIsRenameMutationVisible(true);
    }
    const renameMutationProps: RenameMutationProps = {
        onClose: () => {
            setIsRenameMutationVisible(false);
        },
        onConfirm: async (name) => {
            setIsRenameMutationVisible(false);
            try {
                if (currentMutation) {
                    await updateMutationDetail(currentMutation.id, { name: name });
                    refresh();
                }
            } catch (error) {
                console.error("Failed to rename mutation:", error);
            }
        }
    };

    const handleBookmark = async (mutation: MutationInterface) => {
        await updateMutationDetail(mutation.id, { is_bookmark: !mutation.is_bookmark });
        refresh();
    };

    const handleSelectMutation = (mutation: MutationInterface) => {
        setCurrentMutation(mutation);
        setIsSelectCollection(true);
    }

    return (
        <div>
            <RenameMutationOverlay
                renameMutationProps={renameMutationProps}
                isVisible={isRenameMutationVisible}
            />
            {mutations.length == 0 ? (
                <div className="text-center">
                    <div className="text-label text-xl">No mutation was found</div>
                    <div className="font-light text-pep-gray">
                        Change the filter or create new mutation
                    </div>
                </div>
            ) : (
                <div className="space-y-5">
                    {/* Mutation Table */}
                    <div className="overflow-auto rounded-xl border border-[#DFE4EA] shadow-table w-full max-h-[500px] overflow-y-scroll">
                        <table className="w-full text-xs text-left rtl:text-right">
                            <thead className="leading-6 bg-[#F9FAFB] text-left border-b sticky top-0 h-[60px] z-20">
                                <tr>
                                    <th
                                        className="font-normal px-6 py-3 text-base"
                                    ></th>
                                    {headers.map((header, index) => (
                                        <th
                                            key={index}
                                            className="font-normal px-6 py-3 text-base"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                    <th
                                        className="font-normal px-6 py-3 text-base"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody className="font-light leading-7">
                                {mutations.map((mutation) => (
                                    <tr
                                        key={mutation.id}
                                        className={`font-light border-b h-[80px] w-full ${mutation.id === currentMutation?.id ? "bg-blue-50" : "bg-white"}`}
                                        onClick={() => setCurrentMutation(mutation)}
                                    >
                                        <td className="pl-3 py-3 place-items-center">
                                            <Icon
                                                icon="cil:bookmark"
                                                className={`${mutation.is_bookmark ? "text-pep-orange" : "text-pep-gray"}  text-xl cursor-pointer`}
                                                onClick={() => {
                                                    handleBookmark(mutation);
                                                }} />
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                    className="text-pep-gray size-5 min-w-5 cursor-pointer"
                                                    onClick={() => handleRename(mutation)}
                                                />
                                                <label
                                                    className="truncate text-blue-500 font-normal text-sm leading-5 underline cursor-pointer"
                                                    onClick={() =>
                                                        handleSelectMutation(mutation)
                                                    }
                                                >
                                                    {mutation.name}
                                                </label>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-col items-center w-fit">
                                                <MutationState state={mutation.state as MutationStateType} className="mx-auto" />
                                                {mutation.state === "COMPLETED" && mutation.complete_at && (
                                                    <label>
                                                        Total Time:{" "}
                                                        {getTotalTime(mutation.created_at, mutation.complete_at)} Min
                                                    </label>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 place-items-center">
                                            <div className="flex space-x-4 items-center">
                                                <Icon
                                                    icon="ic:round-refresh"
                                                    className={`size-7 ${mutation.state === "FAILED"
                                                        ? "text-pep-gray cursor-pointer"
                                                        : "text-pep-gray-border cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        if (mutation.state === "FAILED") handleRunMutation(mutation);
                                                    }}
                                                />
                                                <Icon
                                                    icon="streamline:delete-1-solid"
                                                    className="text-error size-5 self-center cursor-pointer"
                                                    onClick={() => handleDelete(mutation)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
