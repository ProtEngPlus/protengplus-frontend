import { OptionValue } from "./Job.interface";

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
