"use client";

import { ModelDataItem, ModelSelectProps } from "../lib/definitions";

export default function ModelSelect({ models, onChange }: ModelSelectProps) {
  return (
    <div className="flex flex-col rounded-xl bg-gray-50 p-4 text-black w-96">
      <h2 className="mb-4 text-xl md:text-2xl">Model Selection</h2>
      <div>
        <select
          onChange={onChange}
          defaultValue=""
          name="models"
          id="modelSelect"
          className="peer text-black block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 w-full"
        >
          <option value="" disabled>
            -- Select a Model --
          </option>
          {models.map((modelInfo: ModelDataItem) => (
            <option key={modelInfo.id} value={modelInfo.id}>
              {modelInfo.attributes.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
