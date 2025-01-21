"use server";

import TomDecisions, { SchemaData } from "../models/Decisions";
import {
  BatchListReturn,
  BatchSubmitReturn,
  DecisionData,
} from "./definitions";
import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }
  await mongoose.connect(MONGODB_URI);
}

export async function getAllModels() {
  try {
    const data = await fetch(`https://api.up2tom.com/v3/models`, {
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "GET",
    });
    const models = await data.json();
    console.log(models);
    return models;
  } catch (error) {
    console.log(error);
  }
}

export async function getModel(modelId: string) {
  try {
    const data = await fetch(`https://api.up2tom.com/v3/models/${modelId}`, {
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "GET",
    });
    const model = await data.json();
    console.log(model);
    return model.data;
  } catch (error) {
    console.log(error);
  }
}

export async function formSubmit(
  state: { data: DecisionData | null; message: string } | null | undefined,
  formData: FormData
): Promise<{ data: DecisionData | null; message: string } | undefined> {
  const modelId = formData.get("modelId") as string; // Extract modelId from formData

  if (!modelId) {
    console.error("Model ID is missing");
    return;
  }

  interface InputData {
    INPUTVAR1?: number;
    INPUTVAR2?: number | string;
    INPUTVAR3?: number;
    INPUTVAR4?: number | string;
    INPUTVAR5?: number | string;
    INPUTVAR6?: number | string;
    INPUTVAR7?: string;
    INPUTVAR8?: number;
    INPUTVAR9?: number;
  }

  try {
    const input: InputData = {};

    if (formData.has("INPUTVAR1")) {
      const value = formData.get("INPUTVAR1");
      input.INPUTVAR1 =
        value !== null && typeof value === "string" ? Number(value) : undefined;
    }

    if (formData.has("INPUTVAR2")) {
      const value = formData.get("INPUTVAR2");
      input.INPUTVAR2 =
        value !== null && typeof value === "string"
          ? Number(value) || value
          : undefined;
    }

    if (formData.has("INPUTVAR3")) {
      const value = formData.get("INPUTVAR3");
      input.INPUTVAR3 =
        value !== null && typeof value === "string" ? Number(value) : undefined;
    }

    if (formData.has("INPUTVAR4")) {
      const value = formData.get("INPUTVAR4");
      input.INPUTVAR4 =
        value !== null && typeof value === "string"
          ? Number(value) || value
          : undefined;
    }

    if (formData.has("INPUTVAR5")) {
      const value = formData.get("INPUTVAR5");
      input.INPUTVAR5 =
        value !== null && typeof value === "string"
          ? Number(value) || value
          : undefined;
    }

    if (formData.has("INPUTVAR6")) {
      const value = formData.get("INPUTVAR6");
      input.INPUTVAR6 =
        value !== null && typeof value === "string"
          ? Number(value) || value
          : undefined;
    }

    if (formData.has("INPUTVAR7")) {
      const value = formData.get("INPUTVAR7");
      input.INPUTVAR7 =
        value !== null && typeof value === "string" ? value : undefined;
    }

    if (formData.has("INPUTVAR8")) {
      const value = formData.get("INPUTVAR8");
      input.INPUTVAR8 =
        value !== null && typeof value === "string" ? Number(value) : undefined;
    }

    if (formData.has("INPUTVAR9")) {
      const value = formData.get("INPUTVAR9");
      input.INPUTVAR9 =
        value !== null && typeof value === "string" ? Number(value) : undefined;
    }

    const res = await fetch(`https://api.up2tom.com/v3/decision/${modelId}`, {
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "scenario",
          attributes: {
            input,
          },
        },
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      console.log("This is the working error");
    } else {
      createDecision(data);
      console.log("Submission successful:", data);
    }

    return {
      ...state,
      data: data,
      message: "Good request",
    };
  } catch (error) {
    console.error("Network or API error:", error);
  }
}

async function createDecision(data: SchemaData) {
  try {
    const decision = new TomDecisions({
      data: {
        attributes: {
          confidence: data.data.attributes.confidence,
          decision: data.data.attributes.decision,
          input: data.data.attributes.input, // Directly use the input as it's already a map-like object
          "meets-confidence": data.data.attributes["meets-confidence"],
          model: data.data.attributes.model,
          timestamp: data.data.attributes.timestamp,
        },
        id: data.data.id,
        type: data.data.type,
      },
    });

    await decision.save(); // Save the decision to the database
    console.log("Decision saved successfully:", decision);
  } catch (error) {
    console.error("Error saving decision to database:", error);
  }
}

export async function batchSubmit(
  state: { data: BatchSubmitReturn | null; message: string } | null | undefined,
  formData: FormData
): Promise<{ data: BatchSubmitReturn | null; message: string } | undefined> {
  try {
    const modelId = formData.get("modelId") as string;
    console.log(modelId);
    // const file = formData.get("file");

    const res = await fetch(`https://api.up2tom.com/v3/batch/${modelId}`, {
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
      },
      method: "POST",
      body: formData,
    });

    // Check for non-success HTTP status codes
    if (!res.ok) {
      const errorText = await res.text(); // Read the raw response text
      console.error("Error Response:", errorText);
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }

    if (res.ok) {
      console.log("Submit was successful");
    }

    // get JSON response
    const data = await res.json();
    console.log("API Response:", data);

    if (data.errors) {
      console.error("API returned errors:", data.errors);
    }

    return {
      ...state,
      data,
      message: "Request was successful",
    };
  } catch (error) {
    console.error("Validation errors:", error);
    throw error;
  }
}

export async function getBatchList(modelId: string): Promise<BatchListReturn> {
  console.log(modelId);
  try {
    if (!modelId) {
      throw new Error("Model ID is required.");
    }

    const res = await fetch(`https://api.up2tom.com/v3/batch/${modelId}`, {
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "GET",
    });
    const data = await res.json();
    console.log("API Response:", data);

    if (data.errors) {
      console.error("API returned errors:", data.errors);
      throw new Error(data.errors[0]?.detail || "API Error");
    }

    return {
      data: { data, modelId },
      message: "Request was successful",
    };
  } catch (error) {
    console.error("Validation errors:", error);
    throw error;
  }
}

export async function deleteBatch(modelId: string, fileId: string) {
  try {
    const res = await fetch(
      `https://api.up2tom.com/v3/batch/${modelId}/${fileId}`,
      {
        headers: {
          Authorization: `Token ${process.env.API_KEY}`,
        },
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(
        `Failed to delete batch. Status: ${res.status}. Details: ${errorDetails}`
      );
    }

    let data;
    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }
    console.log("Deleted Batch Response:", data || "No Content");
    await getBatchList(modelId);
    return { success: true, message: "Batch deleted successfully" };
  } catch (error) {
    console.error("Error deleting batch:", error);
    return { success: false, message: error };
  }
}

export async function downloadBatch(modelId: string, fileId: string) {
  if (!modelId || !fileId) {
    throw new Error("Both Model ID and File ID are required.");
  }

  try {
    const res = await fetch(
      `https://api.up2tom.com/v3/batch/${modelId}/${fileId}`,
      {
        headers: {
          Authorization: `Token ${process.env.API_KEY}`,
        },
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to download file. Please check the inputs.");
    }

    const blob = await res.blob();
    return blob;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}
