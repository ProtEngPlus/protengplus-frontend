import { del, get, post, put } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import {
  Mutation,
  MutationHistogram,
  CreateMutationInterface,
  MutationResult,
  MutationResultSearchParams,
  MutationSearchParams,
} from "../interfaces/Mutation.interface";
import { Params } from "../interfaces/ApiResponse.interface";

const MUTATION_PATH = BACKEND_BASE_URL + "/proteng-conductor/mutations";

/*------------------------- job detail section -------------------------------------*/

export const getMutationHistogram = async (jobId: string) => {
  const path =
    BACKEND_BASE_URL +
    "/proteng-conductor/mutations/histograms?job_id=" +
    jobId;
  return await get<MutationHistogram[]>(path, true);
};

/*------------------------- mutation detail section -------------------------------------*/

export const getMutation = async (mutationId: string) => {
  const path = MUTATION_PATH + `/${mutationId}`;
  return await get<Mutation>(path, true);
};

export const getAllMutations = async (params: MutationSearchParams) => {
  return await get<Mutation[]>(MUTATION_PATH, true, params as Params);
};

export const getAllMutationResult = async (
  params: MutationResultSearchParams
) => {
  const path = MUTATION_PATH + "/results";
  return await get<MutationResult[]>(path, true, params as Params);
};

export const createMutation = async (mutation: CreateMutationInterface) => {
  return await post<CreateMutationInterface>(MUTATION_PATH, mutation, true);
};

export const deleteMutation = async (mutationId: string) => {
  const path = MUTATION_PATH + `/${mutationId}`;
  return await del(path, true);
};

export const runMutation = async (mutationId: string) => {
  const path = MUTATION_PATH + `/${mutationId}/run`;
  return await post(path, {}, true);
};

export const updateMutationDetail = async (
  mutationId: string,
  updateData: Partial<Mutation>
) => {
  const path = MUTATION_PATH + `/${mutationId}`;
  return await put<Mutation>(path, updateData, true);
};
