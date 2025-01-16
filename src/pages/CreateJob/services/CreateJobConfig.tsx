import {
  createJobConfig,
  defaultPipeline,
  Pipelines,
} from "../../../commons/configs/createJobConfig";
import {
  CreateJobInterface,
  CreateJobDetailInterface,
  PipelineItem,
} from "../../../commons/interfaces/CreateJob.interface";
import { JobResponse } from "../../../commons/interfaces/Job.interface";

// create with config
export function generateInitialJobConfig(jobConfig: JobResponse): {
  initialJob: CreateJobInterface;
  initialInfo: CreateJobDetailInterface;
  pipelineItem: PipelineItem[];
} {
  const initialJob = {} as CreateJobInterface;
  const pipelineItem = defaultPipeline;

  const initialInfo: CreateJobDetailInterface = {
    description: jobConfig.description,
    input_protein: jobConfig.input_protein,
    is_notification_on: jobConfig.is_notification_on,
    lab_result: jobConfig.lab_result.sequences.map((sequence, index) => ({
      sequence: sequence,
      score: jobConfig.lab_result.scores[index],
    })),
    name: jobConfig.name,
    run_type: jobConfig.run_type,
  };

  let i = 0;
  jobConfig.meta.forEach((subMethod) => {
    const currentMethod = pipelineItem[i].method;
    initialJob[currentMethod] = {};

    Pipelines[i].subMethod.forEach((value) => {
      if (value.toLowerCase() === subMethod) {
        pipelineItem[i].subMethod = value;
        initialJob[currentMethod][value] =
          jobConfig.options[subMethod] ?? undefined;
      }
    });
    i++;
  });

  return {
    initialJob: initialJob,
    initialInfo: initialInfo,
    pipelineItem: pipelineItem,
  };
}

// create without config
export function generateInitialJob(): CreateJobInterface {
  const initialJob = {} as CreateJobInterface;

  for (const pipeline of defaultPipeline) {
    const { method, subMethod }: { method: string; subMethod: string } =
      pipeline;

    initialJob[method] = initialJob[method] || {};
    initialJob[method][subMethod] = {};
    if (createJobConfig[method].tool[subMethod]) {
      for (const param of createJobConfig[method].tool[subMethod].parameters)
        if (param.type === "rangeNumber") {
          initialJob[method][subMethod][`${param.id}_low`] =
            param.low ?? undefined;
          initialJob[method][subMethod][`${param.id}_high`] =
            param.high ?? undefined;
        } else {
          initialJob[method][subMethod][param.id] = param.default ?? undefined;
        }
    }
  }

  return initialJob;
}
