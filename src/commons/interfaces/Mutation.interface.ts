export interface MutationHistogram {
    name: string,
    data: number[]
}

export interface Mutation {
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