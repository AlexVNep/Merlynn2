import { Schema } from "mongoose";

// Domain interface defines different types of domains for attributes
export interface Domain {
  type: "DomainC" | "DomainR"; // Can be categorical (Nominal) or range-based (Continuous)
  values?: string[]; // Only for "DomainC" (Nominal) - list of possible values
  discrete?: boolean; // Only for "DomainR" (Continuous) - indicates discrete or continuous
  interval?: number; // Only for "DomainR" (Continuous) - the interval for discrete values
  lower?: number; // Only for "DomainR" (Continuous) - lower bound of the range
  upper?: number; // Only for "DomainR" (Continuous) - upper bound of the range
}

// Metadata interface holds the attributes for a model
export interface Metadata {
  attributes: Attribute[]; // List of attributes in the model
}

// Attribute interface defines the properties for each input field in the model
export interface Attribute {
  name: string; // Name of the attribute
  question: string; // Question associated with the attribute
  type: "Nominal" | "Continuous"; // Type of the attribute, either "Nominal" (categorical) or "Continuous" (range)
  domain: Domain; // Domain describing possible values or range
}

// ModelDataItem interface defines the structure of the model object
export interface ModelDataItem {
  id: string; // Unique ID of the model
  type: string; // Type of the model (e.g., 'model')
  attributes: {
    name: string; // Name of the model
    description: string; // Description of the model
    metadata: Metadata; // Metadata containing the attributes
  };
}

export interface DecisionData {
  data: {
    attributes: {
      confidence: number;
      decision: string;
      input: { [key: string]: Schema.Types.Mixed };
      "meets-confidence": boolean;
      model: string;
      timestamp: string | Date;
    };
    id: string;
    type: string;
  };
}

export interface ModelSelectProps {
  models: ModelDataItem[]; // Define the expected type for the models prop
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Define the type for the onChange handler
}

export interface DynamicFormProps {
  modelsData: ModelDataItem[];
}

export interface BatchListReturn {
  data: {
    data: BatchListData;
    modelId: string;
  };
  message: string;
  errors?: unknown;
}

export interface BatchListData {
  data: {
    files: BatchFiles[];
    jobs: BatchJobs[];
  };
}

export interface BatchFiles {
  id: string;
  filename: string;
  timestamp: string;
  size: number;
}

export interface BatchJobs {
  id: string;
  filename: string;
  uploaded: string;
  size: number;
  progress: number;
  delimiter: string;
}

export interface BatchSubmitReturn {
  data: BatchSubmitData;
}

export interface BatchSubmitData {
  jobs: BatchJob[];
}

export interface BatchJob {
  filename: string;
  id: string;
  progress: number;
  size: number;
  uploaded: string;
}

export interface Decision {
  _id: string;
  decision: string;
  confidence: string;
  createdAt: string;
}

interface MongoInput {
  INPUTVAR1: number;
  INPUTVAR2: string;
  INPUTVAR3: number;
  INPUTVAR4: string;
  INPUTVAR5: string;
  INPUTVAR6: string;
}

interface MongoAttributes {
  confidence: number;
  decision: string;
  input: MongoInput;
  "meets-confidence": boolean;
  model: string;
  timestamp: string; // ISO 8601 format
}

interface MongoData {
  attributes: MongoAttributes;
  id: string;
  type: string;
}

export interface MongoReturn {
  data: MongoData;
  _id: string;
  __v: number;
}
