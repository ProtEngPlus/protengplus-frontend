import { Icon } from "@iconify/react";
import { Mutation } from "../../../interfaces/Mutation.interface";

export default function MutationParameterSetup({
    mutation,
    isShowChart = false
}: {
    mutation: Mutation;
    isShowChart?: boolean;
}) {
    const mutationOptions = Object.entries(mutation.options);
    const parameterNameMapper: Record<string, string> = {
        "mutate_pos_range": "Mutate Position Range",
        "num_iterations": "Number Of Iterations",
        "num_trajectories": "Number Of Trajectories",
        "temperature": "Temperature",
    };
    return (
        <div className="space-y-6">
            <div className={`space-y-6 px-5 py-6 font-light rounded-lg h-fit bg-gray-50 drop-shadow-md ${isShowChart ? "grid grid-cols-2 gap-4" : ""}`}>
                <div className="space-y-7">
                    <div className="flex space-x-3 items-center">
                        <Icon icon="ep:setting" className="text-pep-gray size-8" />
                        <label>Parameter Setup</label>
                    </div>
                    <div className="grid grid-cols-[4fr,5fr]">
                        <label>Collection Name:</label>
                        <label className="text-pep-blue">{mutation.name}</label>
                    </div>
                    {mutationOptions.map((option, index) => (
                        <div key={index} className="grid grid-cols-[4fr,5fr]">
                            <label>{parameterNameMapper[option[0]]}:</label>
                            <label>{option[1]}</label>
                        </div>
                    ))}
                </div>
                {isShowChart && (
                    // insert chart here
                    <div className="flex space-x-3">
                        <Icon icon="ic:baseline-bar_chart" className="text-pep-gray size-6" />
                        <label>Fitness Distribution</label>
                    </div>
                )}
            </div>
            {mutation.state === "FAILED" && (
                <div className="flex justify-center items-center p-5 text-red-500 bg-red-50 w-full font-normal" >
                    Error: Unable to mutate, click ‘rerun’ button to recompute
                </div>
            )}
        </div>
    );
}
