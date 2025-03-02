import { LabResult, OptionValue, RunType, State } from "./Job.interface";

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

export interface CreateJobInterface {
  user_id: string;
  ref_job_id?: string;
  name: string;
  description: string;
  input_protein: string;
  meta: string[];
  lab_result: LabResult;
  options: Record<string, Record<string, OptionValue>>;
  is_notification_on: boolean;
  run_type: RunType;
  artifact: Record<string, object> | null;
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

export interface JobConfiguration {
  state: State;
  stage_id: number;
  id: string;
  user_id: string;
  ref_job_id: string;
  name: string;
  description: string;
  input_protein: string;
  meta: string[];
  lab_result: LabResult;
  options: Record<string, Record<string, OptionValue>>;
  is_notification_on: boolean;
  run_type: RunType;
  artifact: Record<string, object>;
}

export interface CreateJobConfiguration {
  state: State;
  stage_id: number;
  user_id: string;
  ref_job_id: string;
  name: string;
  description: string;
  input_protein: string;
  meta: string[];
  lab_result: LabResult;
  options: Record<string, Record<string, OptionValue>>;
  is_notification_on: boolean;
  run_type: RunType;
  artifact: Record<string, object>;
}
