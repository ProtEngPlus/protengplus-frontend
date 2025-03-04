import { useEffect, useState } from "react";
import { CreateMutationInterface, Mutation, MutationHistogram, MutationSearchParams } from "../../../../commons/interfaces/Mutation.interface";
import { createMutation, getAllMutations, getMutationHistogram } from "../../../../commons/api/mutation";
import FitnessDistributionChartData from "./FitnessDistributionChart";
import Button from "../../../../commons/components/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    NewMutationOverlay,
    NewMutationProps,
} from "../Overlay/NewMutationOverlay";
import { PipelineItem } from "../../../../commons/interfaces/CreateJob.interface";
import { useFormContext } from "react-hook-form";
import { createJobConfig } from "../../../../commons/configs/createJobConfig";
import MutationTable from "./MutationTable";
import MutationParameterSetup from "../../../../commons/components/Mutation/MutationParameterSetup/MutationParameterSetup";

export default function MutationResults({
    jobid,
    inputProtein,
    currentStep,
    pipeline,
}: {
    jobid: string,
    inputProtein: string,
    currentStep: number,
    pipeline: PipelineItem[],
}) {
    const { watch } = useFormContext();
    const chartLabels = ["-2.0", "-1.9", "-1.8", "-1.7", "-1.6", "-1.5", "-1.4", "-1.3", "-1.2", "-1.1", "-1.0", "-0.9", "-0.8", "-0.7", "-0.6", "-0.5", "-0.4", "-0.3", "-0.2", "-0.1", "0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9"];
    const [chartSeries, setChartSeries] = useState<MutationHistogram[]>([]);
    const [mutations, setMutations] = useState<Mutation[]>([]);
    const [currentMutation, setCurrentMutation] = useState<Mutation | null>(null);
    const [fetchMutation, setFetchMutation] = useState(false);
    const [isNewMutationVisible, setIsNewMutationVisible] = useState(false);
    const [isBookmarkOnly, setIsBookmarkOnly] = useState(false);

    const refresh = () => {
        setFetchMutation(true);
    };

    const NewMutationProps: NewMutationProps = {
        onClose: () => {
            setIsNewMutationVisible(false);
        },
        onConfirm: async (name) => {
            setIsNewMutationVisible(false);

            try {
                const data = watch();
                const options = {} as Record<string, any>;

                const { method, subMethod }: { method: string; subMethod: string } =
                    pipeline[currentStep];
                const jobConfig = createJobConfig[method].tool[subMethod].parameters;

                jobConfig.forEach((param) => {
                    if (param.type === "rangeNumber") {
                        options[`${param.id}_low`] =
                            data[`${param.id}_low`];
                        options[`${param.id}_high`] =
                            data[`${param.id}_high`];
                    } else {
                        options[param.id] = data[param.id];
                    }
                });

                const newMutation: CreateMutationInterface = {
                    name,
                    job_id: jobid,
                    input_protein: inputProtein,
                    options: options,
                    tool: subMethod.toLowerCase(),
                };
                await createMutation(newMutation);
            } catch (error) {
                console.error("Failed to create new mutation:", error);
            }
        }
    };


    useEffect(() => {
        const fetchChartData = async () => {
            // Call the API to get FitnessDistributionChart data
            if (jobid) {
                const { data } = await getMutationHistogram(jobid);
                if (data) {
                    setChartSeries(data);
                }
            }
        };
        fetchChartData();
    }, []);

    useEffect(() => {
        const params: MutationSearchParams = isBookmarkOnly
            ? { job_id: jobid, is_bookmark: true }
            : { job_id: jobid };

        getAllMutations(params)
            .then((response) => setMutations(response.data || []))
            .catch(console.error);

        setFetchMutation(false);
        setCurrentMutation(null);
    }, [fetchMutation, isBookmarkOnly]);

    return (
        <div>
            <NewMutationOverlay
                isVisible={isNewMutationVisible}
                newMutationProps={NewMutationProps}
                currentStep={currentStep}
                pipeline={pipeline}
            />
            <div className="space-y-11 rounded-lg border border-pep-gray-border px-6 py-8">
                <div className="space-y-6 font-light">
                    <div className="w-full min-w-fit flex justify-between items-center border-l-4 border-pep-orange pl-6 font-light text-xl gap-x-5">
                        <div>Mutation</div>
                        <Button
                            id="new-mutation"
                            type="button"
                            buttonType={"next"}
                            text="New Mutation"
                            className="w-fit text-base inline-flex items-center whitespace-nowrap place-content-center text-center gap-2"
                            onClick={() => { setIsNewMutationVisible(true); }}
                        >
                            <Icon icon="basil:add-outline" className="size-6" />
                        </Button>
                    </div>
                    <hr />

                    <FitnessDistributionChartData chartLabels={chartLabels} chartSeries={chartSeries} />


                    <div className="flex justify-start items-center py-2">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="w-5 h-5 rounded-md border-pep-blue border" checked={isBookmarkOnly} onChange={() => setIsBookmarkOnly((prev) => !prev)} />
                            <div className="text-md font-normal text-gray-500">show bookmark only</div>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <MutationTable mutations={mutations} refresh={refresh} currentMutation={currentMutation} setCurrentMutation={setCurrentMutation} />

                        {currentMutation &&
                            <MutationParameterSetup mutation={currentMutation} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
