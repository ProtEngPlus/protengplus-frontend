import { OptionValue, Order, State } from "./Job.interface";

export type MutationStateType = "PENDING" | "ONGOING" | "FAILED" | "COMPLETED";

export interface MutationHistogram {
  name: string;
  data: number[];
}

export interface Mutation {
  complete_at: string;
  created_at: string;
  histogram_data: number[];
  id: string;
  input_protein: string;
  is_bookmark: boolean;
  job_id: string;
  name: string;
  options: Record<string, OptionValue>;
  state: State;
  tool: string;
  run_id: number;
  user_id: string;
  job_description: string;
  job_name: string;
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

export interface MutationSearchParams {
  job_id?: string;
  is_bookmark?: boolean;
}

export interface MutationResult {
  assay_score: number;
  id: string;
  is_bookmark: boolean;
  job_id: string;
  mutation_id: string;
  mutation_positions: string[];
  protein_sequence: string;
  user_id: string;
}

export interface MutationResultSearchParams {
  mutation_id?: string;
  job_id?: string;
  is_bookmark?: boolean;
  sort?: string;
  min_value?: number;
  max_value?: number;
  order?: Order;
}

export interface CreateMutationInterface {
  name: string;
  job_id: string;
  input_protein: string;
  options: Record<string, OptionValue>;
  tool: string;
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