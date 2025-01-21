"use client";

import ModelSelect from "../components/ModelSelect";
import { useActionState, useState } from "react";
import { DynamicFormProps, BatchSubmitReturn } from "../lib/definitions";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { batchSubmit } from "../lib/actions";

export default function UploadForm({ modelsData }: DynamicFormProps) {
  const [modelId, setModelId] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const initialState = { data: null as BatchSubmitReturn | null, message: "" };
  const [state, formAction] = useActionState(batchSubmit, initialState);

  console.log(state);

  const handleModleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const modelId = event.target.value;
    console.log(modelId);
    setSelectedModel(modelId);
    setModelId(modelId);
  };
  return (
    <div>
      <ModelSelect models={modelsData} onChange={handleModleChange} />
      {selectedModel && (
        <div className="flex flex-col rounded-xl bg-gray-50 p-4 text-black w-96">
          <form action={formAction}>
            <input type="hidden" value={modelId} name="modelId" />
            <div className="mt-4">
              <label
                className="mb-3 block text-xs font-medium text-gray-900"
                htmlFor="file"
              >
                Choose File to Upload
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                  id="file"
                  type="file"
                  name="file"
                  accept=".csv"
                />
                <ArrowUpTrayIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <button
              className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              type="submit"
              // aria-disabled={isPending}
            >
              Upload File
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
