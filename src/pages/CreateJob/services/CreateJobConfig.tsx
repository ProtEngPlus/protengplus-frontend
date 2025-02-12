import {
  createJobConfig,
  defaultPipeline,
  Pipelines,
} from "../../../commons/configs/createJobConfig";
import {
  CreateJobDetail,
  JobOption,
  PipelineItem,
} from "../../../commons/interfaces/CreateJob.interface";
import { JobInterface } from "../../../commons/interfaces/Job.interface";

export function generateInitialJob(): JobOption {
  const initialJob = {} as JobOption;
  for (const pipeline of defaultPipeline) {
    const { method, subMethod }: { method: string; subMethod: string } =
      pipeline;
    initialJob[method] = {};
    initialJob[method][subMethod] = {};
    if (createJobConfig[method].tool[subMethod].parameters) {
      for (const param of createJobConfig[method].tool[subMethod].parameters) {
        if (param.type === "rangeNumber") {
          initialJob[method][subMethod][`${param.id}_low`] = param.low;
          initialJob[method][subMethod][`${param.id}_high`] = param.high;
        } else {
          initialJob[method][subMethod][param.id] = param.default;
        }
      }
    }
  }
  return initialJob;
}

export function generateInitialJobConfig(jobConfig: JobInterface): {
  initialJobOption: JobOption;
  initialJobDetail: CreateJobDetail;
  pipelineItem: PipelineItem[];
} {
  const initialJobOption = {} as JobOption;
  const pipelineItem = defaultPipeline;
  const initialJobDetail: CreateJobDetail = {
    name: jobConfig.name,
    description: jobConfig.description,
    input_protein: jobConfig.input_protein,
    lab_result: jobConfig.lab_result.sequences.map((sequence, index) => ({
      sequence: sequence,
      score: jobConfig.lab_result.scores[index],
    })),
    run_type: jobConfig.run_type,
    is_notification_on: jobConfig.is_notification_on,
    ref_job_id: jobConfig.ref_job_id,
    artifact: jobConfig.artifact,
  };

  let index = 0;
  jobConfig.meta.forEach((subMethod) => {
    const currentMethod = pipelineItem[index].method;
    initialJobOption[currentMethod] = {};

    Pipelines[index].subMethod.forEach((value) => {
      if (value.toLowerCase() === subMethod) {
        pipelineItem[index].subMethod = value;
        initialJobOption[currentMethod][value] = jobConfig.options[subMethod];
      }
    });
    index++;
  });
  return {
    initialJobOption: initialJobOption,
    initialJobDetail: initialJobDetail,
    pipelineItem: pipelineItem,
  };
}
