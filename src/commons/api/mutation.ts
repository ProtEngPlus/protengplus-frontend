import { get, post } from "./common";
import { BACKEND_BASE_URL } from "../configs/apiConfig";
import { CreateMutationInterface, Mutation, MutationHistogram } from "../interfaces/Mutation.interface";

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

/*------------------------- mutation detail section -------------------------------------*/

export const getMutation = async (mutationId: string) => {
    const path = MUTATION_PATH + `/${mutationId}`;
    return await get<Mutation>(path, true);
};