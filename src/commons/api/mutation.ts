import { del, get, post, put } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { CreateMutationInterface, Mutation, MutationHistogram, MutationSearchParams } from "../interfaces/Mutation.interface";
import { Params } from "../interfaces/ApiResponse.interface";

const MUTATION_PATH = BACKEND_BASE_URL + "/proteng-conductor/mutations";

/*------------------------- job detail section -------------------------------------*/

export const getMutationHistogram = async (jobId: string) => {
    const path = MUTATION_PATH + `/histograms?job_id=${jobId}`;
    return await get<MutationHistogram[]>(path, true);
};

export const createMutation = async (mutation: CreateMutationInterface) => {
    const path = MUTATION_PATH;
    return await post<CreateMutationInterface>(path, mutation, true);
};

export const getAllMutations = async (params: MutationSearchParams) => {
    const path = MUTATION_PATH;
    return await get<Mutation[]>(path, true, params as Params);
}

export const deleteMutation = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await del(path, true);
}

export const runMutation = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}/run`;
    return await post(path, {}, true);
}

export const updateMutationDetail = async (mutationId: string, updateData: Partial<Mutation>) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await put<Mutation>(path, updateData, true);
}

/*------------------------- mutation detail section -------------------------------------*/

export const getMutation = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await get<Mutation>(path, true);
};