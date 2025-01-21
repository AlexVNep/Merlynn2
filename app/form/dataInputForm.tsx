"use client";

import { useEffect, useState, useActionState } from "react";
import { formSubmit, getModel } from "../lib/actions";
import { ModelDataItem, Attribute, DecisionData } from "../lib/definitions";

interface InputFormProps {
  modelId: string;
}

export default function InputForm({ modelId }: InputFormProps) {
  const [data, setData] = useState<ModelDataItem | null>(null); // Start with null
  const initialState = { data: null as DecisionData | null, message: "" };
  const [state, formAction] = useActionState(formSubmit, initialState);

  if (state) {
    console.log(state);
  }

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const modelDataResponse = await getModel(modelId);
        console.log("API Response", modelDataResponse);
        setData(modelDataResponse); // Ensure you're updating the state with the correct value
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };

    fetchModelData();
  }, [modelId]); // Re-fetch when modelId changes

  const renderInputField = (input: Attribute, index: number) => {
    const { question, type, domain } = input;

    if (type === "Nominal" && domain?.values) {
      return (
        <div key={index} className="flex flex-col mb-4">
          <label
            htmlFor={input.name}
            className="mb-2 text-sm font-medium text-gray-700"
          >
            {question}
          </label>
          <select
            id={input.name}
            name={input.name}
            className="rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            {domain.values.map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (
      type === "Continuous" &&
      domain?.lower !== undefined &&
      domain?.upper !== undefined
    ) {
      return (
        <div key={index} className="flex flex-col mb-4">
          <label
            htmlFor={input.name}
            className="mb-2 text-sm font-medium text-gray-700"
          >
            {question}
          </label>
          <input
            type="number"
            id={input.name}
            name={input.name}
            min={domain.lower}
            max={domain.upper}
            step={domain.interval || 1}
            placeholder={`Enter a value between ${domain.lower} and ${domain.upper}`}
            className="rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      );
    } else {
      return (
        <div key={index} className="flex flex-col mb-4">
          <label
            htmlFor={input.name}
            className="mb-2 text-sm font-medium text-gray-700"
          >
            {question}
          </label>
          <input
            type="text"
            id={input.name}
            name={input.name}
            placeholder="Enter value"
            className="rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg text-black rounded-lg bg-gray-100 p-6 shadow-md">
      {data ? (
        <div>
          <h2 className="text-xl font-bold mb-4">{data.attributes.name}</h2>
          <p className="text-gray-700 mb-6">{data.attributes.description}</p>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="modelId" value={modelId} />
            {data.attributes.metadata.attributes.map(
              (input: Attribute, index: number) =>
                renderInputField(input, index)
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p className="text-gray-600">Loading data for model: {modelId}...</p>
      )}
    </div>
  );
}
