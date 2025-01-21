"use client";

import { useState } from "react";
import InputForm from "./dataInputForm";
import ModelSelect from "../components/ModelSelect";
import { DynamicFormProps } from "../lib/definitions";

export default function DynamicForm({ modelsData }: DynamicFormProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleModleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);
  };

  return (
    <div>
      <ModelSelect models={modelsData} onChange={handleModleChange} />
      {selectedModel && <InputForm modelId={selectedModel} />}
    </div>
  );
}
