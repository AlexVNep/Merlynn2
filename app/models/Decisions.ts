import mongoose, { Schema } from "mongoose";

const { model, models } = mongoose;

export interface SchemaAttributes {
  confidence: number;
  decision: string;
  input: { [key: string]: Schema.Types.Mixed }; // Key-value pairs of mixed data types
  "meets-confidence": boolean;
  model: string;
  timestamp: string;
}

export interface SchemaData {
  data: {
    attributes: SchemaAttributes;
    id: string;
    type: string;
  };
}

const decisionSchema = new Schema<SchemaData>({
  data: {
    attributes: {
      confidence: Number,
      decision: String,
      input: {} as { [name: string]: Schema.Types.Mixed },
      "meets-confidence": Boolean,
      model: String,
      timestamp: String,
    },
    id: String,
    type: { type: String },
  },
});

const TomDecisions =
  models.TomDecisions || model<SchemaData>("TomDecisions", decisionSchema); //ensures the Decision model is only defined once, even if Decision.js is imported multiple times

export default TomDecisions;
