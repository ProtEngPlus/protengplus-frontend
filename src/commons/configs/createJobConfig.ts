import { PipelineItem } from "../interfaces/CreateJob.interface";

export interface CreateJobConfigInterface {
  [method: string]: {
    description: string;
    tool: {
      [subMethod: string]: {
        description: string;
        parameters: MethodParameter[];
      };
    };
  };
}

export interface MethodParameter {
  name: string;
  id: string;
  type: "string" | "number" | "rangeNumber" | "percent" | "dropdown" | "multiNumberDropdown";
  description: string;
  default?: string | number | number[];
  low?: number;
  high?: number;
  itemType?: string;
  dropdownItems?: string[] | number[];
  additionalValidation?: ValidationRule;
}

export interface ValidationRule {
  required?: { value: boolean; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  isInteger?: { value: boolean; message: string };
}

export const defaultPipeline: PipelineItem[] = [
  { method: "Protein Query", subMethod: "Blast" },
  { method: "Protein Representation", subMethod: "Unirep" },
  { method: "Top Model", subMethod: "RidgeCV" },
  { method: "Mutation", subMethod: "MCMC" },
];

export const createJpbConfig: CreateJobConfigInterface = {
    "Protein Input": {
        description: "Protein sequence to be mutated and scored, provided in FASTA format or UniProt ID.",
        tool: {
            "ProteinFilter": {
                description: "The specific species or biological entity from which the protein sequence originates",
                parameters: [
                    {
                        name: "Percent Identity",
                        id: "perc_ident",
                        type: "multiNumberDropdown",
                        description: "The minimum percentage of sequence identity in the database required for a match to the query sequence to be considered significant",
                    },
                    {
                        name: "E Value",
                        id: "expect",
                        type: "multiNumberDropdown",
                        description:
                        "The number of expected hits of similar quality (score) that could be found by chance. The smaller the E-value, the better the match.",
                    },
                    {
                        name: "Query Cover",
                        id: "query_cover",
                        type: "multiNumberDropdown",
                        description:
                        "The percentage of the query sequence (your specimen) that overlaps with the database sequence",
                    },
                ],
            },
        },
    },
    "Protein Query": {
        description: "Protein Query Tool to gather similar proteins from a global database",
        tool: {
            Blast: {
                description: "Tool used to compare a query protein sequence against a database of sequences by aligning sequences based on local matches.",
                parameters: [
                    {
                        name: "Program",
                        id: "program",
                        type: "dropdown",
                        description: "Selected program for the tool",
                        dropdownItems: ["blastp"],
                        default: "blastp",
                    },
                    {
                        name: "Database",
                        id: "database",
                        type: "dropdown",
                        description: "Database targeted for protein query",
                        dropdownItems: ["nr"],
                        default: "nr",
                        additionalValidation: {
                            required: { value: true, message: "Database is required." },
                        },
                    },
                    {
                        name: "Hit Size",
                        id: "hitlist_size",
                        type: "percent",
                        description:
                        "The maximum number of protein sequences returned from the database that match the query sequence",
                        default: 70,
                        additionalValidation: {
                            required: { value: true, message: "Hit Size is required." },
                            min: { value: 0, message: "Hit Size must be at least 0." },
                        },
                    },
                    {
                        name: "E Value",
                        id: "expect",
                        type: "percent",
                        description:
                        "The number of expected hits of similar quality (score) that could be found by chance. The smaller the E-value, the better the match.",
                        default: 70,
                        additionalValidation: {
                            required: { value: true, message: "Expect is required." },
                            min: { value: 0, message: "Expect must be at least 0." },
                        },
                    },
                    {
                        name: "Sequence Length",
                        id: "seq_length",
                        type: "number",
                        description: "",
                        default: 70,
                        additionalValidation: {
                            required: {
                                value: true,
                                message: "Sequence Length is required.",
                            },
                            min: {
                                value: 0,
                                message: "Sequence Length must be at least 0.",
                            },
                        },
                    },
                    {
                        name: "Percent Identity",
                        id: "perc_ident",
                        type: "percent",
                        description:
                        "The minimum percentage of sequence identity in the database required for a match to the query sequence to be considered significant",
                        default: 70,
                        additionalValidation: {
                            required: {
                                value: true,
                                message: "Percent Indentity is required.",
                            },
                            min: {
                                value: 0,
                                message: "Percent Indentity must be at least 0.",
                            },
                        },
                    },
                    {
                        name: "Random State",
                        id: "random_state",
                        type: "number",
                        description:
                        "Seed of the random number used in the query algorithm",
                        default: 50,
                        additionalValidation: {
                            required: { value: true, message: "Random State is required." },
                            min: { value: 0, message: "Random State must be at least 0." },
                        },
                    },
                    {
                        name: "HSP Coverage",
                        id: "hsp_cov",
                        type: "number",
                        description:
                        "The minimum percentage of sequence identity in the database required for a match to the query sequence to be considered significant",
                        default: 50,
                        additionalValidation: {
                            required: { value: true, message: "HSP Coverage is required." },
                            min: { value: 0, message: "HSP Coverage must be at least 0." },
                        },
                    },
                ],
            },
        },
    },
    "Protein Representation": {
        description: "A fine-tuning tool that combines features from both the global and local sequence landscapes and presents them in a holistic statistical summary",
        tool: {
            Unirep: {
                description: "Model that generates fixed-length numerical representations (embeddings) of protein sequences.",
                parameters: [
                    {
                        name: "N Trial",
                        id: "n_trials",
                        type: "number",
                        description:
                        "The number of trials for fine-tuning using the protein representation technique. The higher the number of trials, the greater the model consistency",
                        default: 2,
                        additionalValidation: {
                            required: { value: true, message: "N Trial is required." },
                            min: { value: 0, message: "N Trial must be at least 0." },
                        },
                    },
                    {
                        name: "N Splits",
                        id: "n_splits",
                        type: "number",
                        description: "The number of dataset splits for training, validation, and testing. Each split consists of groups of datasets with different associated data More splits (N) reduce bias, prevent overfitting, and improve generalization",
                        default: 2,
                        additionalValidation: {
                            required: { value: true, message: "N Splits is required." },
                            min: { value: 0, message: "N Splits must be at least 0." },
                        },
                    },
                    {
                        name: "N Epoch",
                        id: "n_epochs_config",
                        type: "rangeNumber",
                        description: "The minimum and maximum number of times the training model sees each sample in the dataset",
                        low: 1,
                        high: 2,
                        additionalValidation: {
                            required: { value: true, message: "N Epoch is required." },
                            min: { value: 0, message: "N Epoch must be at least 0." },
                        },
                    },
                    {
                        name: "Learning Rate",
                        id: "learning_rate_config",
                        type: "rangeNumber",
                        description: "The minimum and maximum weight changes for the model during training",
                        low: 0.00001,
                        high: 0.001,
                        additionalValidation: {
                            required: {
                                value: true,
                                message: "Learning Rate - low is required.",
                            },
                            min: {
                                value: 0,
                                message: "Learning Rate - low must be at least 0.",
                            },
                        },
                    },
                ],
            }
        },
    },
    "Top Model": {
        description:"Machine Learning model for training the dataset",
        tool:{
            RidgeCV:{
                description: "RidgeCV is a linear regression model that includes built-in cross-validation to automatically select the best regularization parameter (alpha). ",
                parameters:[
                    {
                        name: "Training Batch Sizes",
                        id: "train_batch_sizes",
                        type: "multiNumberDropdown",
                        description: "The number of training examples the model sees before updating its internal parameters (number of samples per iteration) Multiple batch sizes can be selected to find the best one",
                        itemType: "number",
                        dropdownItems: [24, 32, 64, 96, 128],
                        default: [24,32],
                    },
                    {
                        name: "N Batch",
                        id: "n_batch",
                        type: "number",
                        description: "The number of grouped training examples for each iteration",
                        default: 56,
                        additionalValidation: {
                            required: { value: true, message: "N Batch is required." },
                            min: { value: 0, message: "N Batch must be at least 0." },
                        },
                    },
                    {
                        name: "Alpha",
                        id: "alpha",
                        type: "number",
                        description: "A measure of how much the model is overfitting, Regularization Strength As alpha increases, strength increases, leading to more variance from the regular model",
                        default: 0.1,
                        additionalValidation: {
                        required: { value: true, message: "Alpha is required." },
                        min: { value: 0, message: "Alpha must be at least 0." },
                        },
                    },
                ],
            },
        },
    },
    Mutation:{
        description:"The output of the model",
        tool:{
            MCMC:{
                description:"This training model is designed to generate mutated protein sequences from the query sequence and predict assay scores.",
                parameters:[
                    {
                        name: "Number of Trajectories",
                        id: "num_trajectories",
                        type: "number",
                        description: "The number of time protein position randomly selected to mutate",
                        default: 5,
                        additionalValidation: {
                        required: {
                            value: true,
                            message: "Number of trajectories is required.",
                        },
                        min: {
                            value: 0,
                            message: "Number of trajectories must be at least 0.",
                        },
                        isInteger: {
                            value: true,
                            message: "Number of trajectories must be an integer.",
                        },
                        },
                    },
                    {
                        name: "Number of Iterations",
                        id: "num_iterations",
                        type: "number",
                        description: "The number of mutation cycles, which is the number of times a protein sequence is mutated",
                        default: 25,
                        additionalValidation: {
                        required: {
                            value: true,
                            message: "Number of iterations is required.",
                        },
                        min: {
                            value: 0,
                            message: "Number of iterations must be at least 0.",
                        },
                        },
                    },
                    {
                        name: "Mutated Position Range",
                        id: "mutated_pos_range",
                        type: "number",
                        description: "The range of positions from the current mutated position where the next mutation is located",
                        default: 5,
                        additionalValidation: {
                        required: {
                            value: true,
                            message: "Number of iterations is required.",
                        },
                        min: {
                            value: 0,
                            message: "Number of iterations must be at least 0.",
                        },
                        },
                    },
                    {
                        name: "Temperature",
                        id: "temperature",
                        type: "number",
                        description: "Determining whether the output is more random and creative (high temperature) or more predictable (low temperature)",
                        default: 0.01,
                        additionalValidation: {
                            required: { value: true, message: "Temperature is required." },
                            min: { value: 0, message: "Temperature must be at least 0." },
                        },
                    },
                ]
            }
        }
    }
};


