import { useEffect, useState } from "react";
import { CreateMutationInterface, MutationHistogram } from "../../../../commons/interfaces/Mutation.interface";
import { createMutation, getMutationHistogram } from "../../../../commons/api/mutation";
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
    const [isNewMutationVisible, setIsNewMutationVisible] = useState(false);
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

    const chartLabels = ["-2.0", "-1.9", "-1.8", "-1.7", "-1.6", "-1.5", "-1.4", "-1.3", "-1.2", "-1.1", "-1.0", "-0.9", "-0.8", "-0.7", "-0.6", "-0.5", "-0.4", "-0.3", "-0.2", "-0.1", "0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9"];
    const [chartSeries, setChartSeries] = useState<MutationHistogram[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // Call the API to get FitnessDistributionChart data
            if (jobid) {
                const { data } = await getMutationHistogram(jobid);
                if (data) {
                    setChartSeries(data);
                }
            }
        };
        fetchData();
    }, []);

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
                </div>
            </div>
        </div>
    );
}
