import { LabResult, OptionValue, RunType } from "./Job.interface";

export interface RunTime {
    start_time: string;
    end_time: string;
}

export interface ReportInterface {
    user_id: string;
    username: string;
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
    run_time?: Record<string, RunTime> | null;
    created_at?: Date | null;
}
