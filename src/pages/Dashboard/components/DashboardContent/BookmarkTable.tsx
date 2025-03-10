import { Icon } from "@iconify/react/dist/iconify.js";
import JobState from "../../../../commons/components/Job/JobState/JobState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mutation,
  MutationResult,
} from "../../../../commons/interfaces/Mutation.interface";
import {
  getAllMutationResult,
  getAllMutations,
} from "../../../../commons/api/mutation";
import {
  InputProteinOverlay,
  InputProteinOverlayProps,
} from "../../../../commons/components/CreateJob/InputProteinOverlay/InputProteinOverlay";
import React from "react";

const headers = ["Mutation Collection", "Job Name", "Status"];

export default function BookmarkTable() {
  const navigate = useNavigate();
  const [mutations, setMutations] = useState<Mutation[]>([]);
  const [currentMutation, setCurrentMutation] = useState<Mutation>();
  const [isExpand, setIsExpand] = useState(false);
  const [mutationResult, setMutationResult] = useState<MutationResult[]>();
  const [inputProtein, setInputProtein] = useState("");

  useEffect(() => {
    const fetchMutations = async () => {
      try {
        const data = await getAllMutations({
          is_bookmark: true,
        });
        if (data.data) {
          setMutations(data.data);
        }
      } catch (error) {
        console.error("Error fetching mutations:", error);
      }
    };

    fetchMutations();
  }, []);

  useEffect(() => {
    const fetchMutationResult = async () => {
      if (!currentMutation) return;
      try {
        const data = await getAllMutationResult({
          mutation_id: currentMutation.id,
          is_bookmark: true,
        });
        if (data.data) {
          setMutationResult(data.data);
        }
      } catch (error) {
        console.error("Error fetching mutations:", error);
      }
    };
    fetchMutationResult();
  }, [currentMutation]);

  const [isProteinVisible, setProteinVisible] = useState(false);
  const InputProteinProps: InputProteinOverlayProps = {
    inputProtein,
    onClose: () => setProteinVisible(false),
  };

  return (
    <div>
      <InputProteinOverlay
        isVisible={isProteinVisible}
        inputProteinProps={InputProteinProps}
      />
      <div className="space-y-3 max-h-[349px]">
        <div className="flex flex-row items-center space-x-2 ">
          <Icon icon="cil:bookmark" className="text-pep-orange" />
          <p className="font-light text-xl leading-[150%]">Your Bookmark</p>
        </div>

        {/* Bookmark table*/}
        <div className="relative overflow-y-auto w-full min-w-fit max-h-[calc(349px-42px)] rounded-xl border border-pep-gray-border">
          <table className="w-full text-xs text-left rtl:text-right">
            {/* Header */}
            <thead className="leading-6 bg-[#F9FAFB] text-center border-b">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="font-normal text-sm px-6 py-3 text-wrap"
                  >
                    {header}
                  </th>
                ))}

                <th scope="col" className="font-normal text-sm px-6 py-3"></th>
              </tr>
            </thead>

            {/* content */}
            <tbody className="font-light leading-7">
              {mutations.map((mutation, index) => (
                <React.Fragment key={index}>
                  {/* Mutation Row */}
                  <tr className="bg-white border-b align-text-top">
                    <td className="px-6 py-4 text-left">{mutation.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <label className="truncate text-sm text-black">
                          {mutation.job_name}
                        </label>
                        <label className="truncate">desc</label>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <JobState state={mutation.state} className="mx-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        <Icon
                          icon="carbon:view"
                          className="text-pep-blue size-5 cursor-pointer"
                          onClick={() =>
                            navigate(`/dashboard/job-detail/${mutation.job_id}`)
                          }
                        />
                        <Icon
                          icon={
                            currentMutation?.job_id === mutation.job_id &&
                            isExpand
                              ? "mingcute:up-line"
                              : "mingcute:down-line"
                          }
                          className="text-pep-gray size-5 cursor-pointer"
                          onClick={() => {
                            if (
                              currentMutation?.job_id === mutation.job_id &&
                              isExpand
                            ) {
                              setIsExpand(false);
                            } else {
                              setCurrentMutation(mutation);
                              setIsExpand(true);
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>

                  {/* Mutation Result Table (Only for the selected mutation) */}
                  {isExpand &&
                    currentMutation?.job_id === mutation.job_id &&
                    mutationResult && (
                      <tr>
                        <td colSpan={4}>
                          <MutationResultTable
                            mutationResult={mutationResult}
                            handleViewSequence={(sequence: string) => {
                              setInputProtein(sequence);
                              setProteinVisible(true);
                            }}
                          />
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MutationResultTable = ({
  mutationResult,
  handleViewSequence,
}: {
  mutationResult: MutationResult[];
  handleViewSequence: (sequence: string) => void;
}) => {
  return (
    <table className="w-full text-xs text-left rtl:text-right">
      {/* Header */}
      <thead className="leading-6 bg-pep-gray-light text-center border-b w-full">
        <tr>
          <th colSpan={2} className="font-normal text-sm px-6 py-3">
            Protein Sequence
          </th>
          <th scope="col" className="font-normal text-sm px-6 py-3">
            Assay Score
          </th>
          <th scope="col" className="font-normal text-sm px-6 py-3"></th>
        </tr>
      </thead>

      {/* content */}
      <tbody className="font-light leading-7">
        {mutationResult.length > 0 &&
          mutationResult.map((result, index) => (
            <tr key={index} className="bg-white border-b align-text-top">
              <td
                colSpan={2}
                className="px-6 py-4 text-left truncate max-w-[300px]"
              >
                {result.mutation_positions.join(", ")}
              </td>
              <td className="px-6 py-4 text-left">{result.assay_score}</td>
              <td className="px-5 place-items-center">
                <button
                  className="flex cursor-pointer items-center space-x-1"
                  type="button"
                  onClick={() => handleViewSequence(result.protein_sequence)}
                >
                  <span className="text-pep-blue underline">View Sequence</span>
                  <Icon icon="carbon:view" className="size-5 text-pep-blue" />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
