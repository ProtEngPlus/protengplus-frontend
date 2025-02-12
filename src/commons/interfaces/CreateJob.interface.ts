import { OptionValue, RunType, State } from "./Job.interface";

export const stepsForCreateJob = [
  "Protein Query",
  "Protein Representation",
  "Upload Lab Input",
  "Top Model",
  "Mutation",
  "Conclusion",
];

export interface PipelineItem {
  method: string;
  subMethod: string;
}

export interface PipelineItems {
  method: string;
  subMethod: string[];
}

export interface CreateJobDetail {
  name: string;
  description: string;
  input_protein: string;
  lab_result: { sequence: string; score: number }[]; // to add in table and export csv easier
  run_type: RunType;
  is_notification_on: boolean;
  ref_job_id?: string;
  artifact: Record<string, object> | null;
}

// option that send to backend
export interface CreateJobOption {
  [subMethod: string]: {
    [key: string]: OptionValue;
  };
}

// option that use on website
export interface JobOption {
  [method: string]: {
    [subMethod: string]: {
      [key: string]: OptionValue;
    };
  };
}
