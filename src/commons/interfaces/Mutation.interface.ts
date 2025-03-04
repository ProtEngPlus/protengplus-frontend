import { OptionValue, Order, State } from "./Job.interface";

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

export interface MutationSearchParams {
  job_id?: string;
  name?: string;
  is_bookmark?: boolean;
  sort?: string;
  order?: Order;
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
  min_value?: boolean;
  max_value?: boolean;
}
