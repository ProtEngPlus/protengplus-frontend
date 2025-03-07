import { OptionValue } from "./Job.interface";

export type MutationStateType = "PENDING" | "ONGOING" | "FAILED" | "COMPLETED";

export interface MutationHistogram {
    name: string,
    data: number[]
}

export interface MutationInterface {
    id: string,
    name: string,
    job_id: string,
    run_id: string,
    input_protein: string,
    options: string,
    tool: string,
    state: string,
    is_bookmark: boolean,
    user_id: string,
    histogram_data: number[],
    created_at: string,
    complete_at: string,
}

export interface CreateMutationInterface {
    name: string,
    job_id: string,
    input_protein: string,
    options: Record<string, OptionValue>;
    tool: string,
}

export interface MutationSearchParams {
    job_id?: string,
    is_bookmark?: boolean,
}

export interface MutationResultInterface {
    id: string,
    mutation_id: string,
    job_id: string,
    user_id: string,
    protein_sequence: string,
    mutation_positions: string[],
    assay_score: number,
    is_bookmark: boolean,
}

export interface MutationResultSearchParams {
    mutation_id?: string,
    is_bookmark?: boolean,
}