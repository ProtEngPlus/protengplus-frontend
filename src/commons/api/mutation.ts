import { del, get, getRaw, post, put } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import {
  Mutation,
  MutationInterface,
  MutationHistogram,
  CreateMutationInterface,
  MutationResult,
  MutationResultInterface,
  MutationResultSearchParams,
  MutationSearchParams,
} from "../interfaces/Mutation.interface";
import { Params } from "../interfaces/ApiResponse.interface";

const MUTATION_PATH = BACKEND_BASE_URL + "/proteng-conductor/mutations";
const MUTATION_RESULT_PATH = BACKEND_BASE_URL + "/proteng-conductor/mutations/results";

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

export const updateMutationDetail = async (mutationId: string, updateData: Partial<MutationInterface>) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await put<MutationInterface>(path, updateData, true);
}

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

export const getAllMutationResults = async (params: MutationResultSearchParams) => {
    const path = MUTATION_RESULT_PATH;
    return await get<MutationResultInterface[]>(path, true, params as Params);
}

export const updateMutationResultDetail = async (mutationResultId: string, updateData: Partial<MutationResultInterface>) => {
    const path = MUTATION_RESULT_PATH + `/${mutationResultId}`;
    return await put<MutationResultInterface>(path, updateData, true);
}

export const downloadMutationResults = async (mutationId: string, params: MutationResultSearchParams) => {
    const path = MUTATION_PATH + `/${mutationId}/download`;
    return await getRaw(path, true, params as Params);
}