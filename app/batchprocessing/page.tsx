"use client";

import Batches from "./Batches";
import { getAllModels } from "../lib/actions";
// import ModelSelect from "../components/ModelSelect";
import { useEffect, useState } from "react";
import { ModelDataItem } from "../lib/definitions";

export default function Page() {
  // const [modelId, setModelId] = useState<string>("");
  const [model, setModel] = useState<ModelDataItem[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getAllModels();
      const dataArray = data.data;
      setModel(dataArray);
    };
    fetchModels();
  }, []);

  // const handleModleChange = async (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const modelId = event.target.value;
  //   console.log(modelId);
  //   setModelId(modelId);
  // };

  return (
    <div>
      {/* <ModelSelect
        models={model}
        modelId={modelId}
        onChange={handleModleChange}
      ></ModelSelect> */}
      <Batches modelsData={model} />
    </div>
  );
}
