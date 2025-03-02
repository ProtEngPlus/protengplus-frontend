import { useState } from "react";
import { Mutation } from "../../../../commons/interfaces/Mutation.interface";
import {
    DeleteOverlay,
    DeleteOverlayProps,
} from "../../../../commons/components/ModalOverlay/DeleteOverlay";
import { Icon } from "@iconify/react/dist/iconify.js";
import { deleteMutation, runMutation, updateMutationDetail } from "../../../../commons/api/mutation";
import { useNavigate } from "react-router-dom";
import editIcon from "../../../../assets/images/CreateJob/editIcon.svg";
import { RenameMutationOverlay, RenameMutationProps } from "../Overlay/RenameMutationOverlay";

const headers = [
    "Collection Name",
    "Status",
];

export default function MutationTable({
    mutations,
    refresh,
    currentMutation,
    setCurrentMutation,
}: {
    mutations: Mutation[];
    refresh: () => void;
    currentMutation: Mutation | null;
    setCurrentMutation: (mutation: Mutation) => void;
}) {
    const navigate = useNavigate();
    const [isDeleteVisible, setDeleteVisible] = useState(false);

    const [isRenameMutationVisible, setIsRenameMutationVisible] = useState(false);

    const handleRename = (mutation: Mutation) => {
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

    const handleDelete = (mutation: Mutation) => {
        setCurrentMutation(mutation);
        setDeleteVisible(true);
    };
    const DeleteProps: DeleteOverlayProps = {
        id: "delete-job",
        onClose: () => {
            setDeleteVisible(false);
        },
        onDelete: async () => {
            if (currentMutation) {
                await deleteMutation(currentMutation.id);
            }
            setDeleteVisible(false);
            refresh();
        },
        title: "Do you want to delete this mutation collection?",
        children: (
            <div className="flex flex-col font-light mt-4 gap-y-2">
                <label>
                    Collection name: {currentMutation?.name} <br />
                </label>
                <label className="text-red-500">
                    Delete the mutate will delete all this mutate's bookmark
                </label>
            </div>
        ),
    };

    const handleRunMutation = async (mutation: Mutation) => {
        await runMutation(mutation.id);
        refresh();
    };

    return (
        <div>
            <DeleteOverlay isVisible={isDeleteVisible} deleteProps={DeleteProps} />
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
                            <thead className="leading-6 bg-[#F9FAFB] text-left border-b sticky top-0 h-[60px]">
                                <tr>
                                    <th
                                        className="font-normal px-6 py-3 text-base"
                                    ></th>
                                    {headers.map((header, index) => (
                                        <th
                                            key={index}
                                            className="font-normal px-3 py-3 text-base"
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
                                        <td className="px-3 py-3 place-items-center">
                                            <div className="flex space-x-4 items-center">
                                                <Icon
                                                    icon="ic:round-refresh"
                                                    className={`size-7 ${mutation.state === "FAILED"
                                                        ? "text-pep-gray cursor-pointer"
                                                        : "text-pep-gray-border cursor-not-allowed"
                                                        }`}
                                                    onClick={() => {
                                                        mutation.state === "FAILED" && handleRunMutation(mutation);
                                                    }}
                                                />
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                    className="text-pep-gray size-5 min-w-5 cursor-pointer"
                                                    onClick={() => handleRename(mutation)}
                                                />
                                            </div>
                                        </td>
                                        <td className="flex px-3 py-3 items-center h-[80px]">
                                            <label
                                                className="truncate text-blue-500 font-normal text-sm leading-5 underline cursor-pointer"
                                                onClick={() =>
                                                    navigate(`/dashboard/job-detail/${mutation.id}`)
                                                }
                                            >
                                                {mutation.name}
                                            </label>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            {/* <MutationState state={mutation.state} className="mx-auto" /> */}
                                            {/* {mutation. && (
                        <label>Total Time: {mutation.totalTime} Min</label>
                      )} */}
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
                                                        mutation.state === "FAILED" && handleRunMutation(mutation);
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
