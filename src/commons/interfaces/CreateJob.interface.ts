import { InputMode, OptionValue, RunType } from "./Job.interface";

export interface CreateJobDetailInterface {
  name: string;
  description: string;
  run_type: RunType;
  is_notification_on: boolean;
  input_protein: string;
  input_mode: InputMode;
  lab_result: { sequence: string; score: number }[];
}

export interface CreateJobInterface {
  [method: string]: {
    [subMethod: string]: {
      [key: string]: OptionValue;
    };
  };
}

export interface PipelineItem {
  method: string;
  subMethod: string;
}

export interface PipelineItems {
  method: string;
  subMethod: string[];
}
