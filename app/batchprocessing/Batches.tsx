"use client";

import ModelSelect from "../components/ModelSelect";
import { getBatchList, deleteBatch, downloadBatch } from "../lib/actions";
import {
  BatchFiles,
  BatchListReturn,
  DynamicFormProps,
} from "../lib/definitions";
import { useCallback, useEffect, useState } from "react";

export default function Batches({ modelsData }: DynamicFormProps) {
  const [modelId, setModelId] = useState<string>("");

  const [batch, setBatch] = useState<BatchListReturn>();

  const handleModleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const modelId = event.target.value;
    console.log(modelId);
    setModelId(modelId);
  };

  const fetchBatchList = useCallback(async () => {
    try {
      if (!modelId) return;
      const response = await getBatchList(modelId);
      console.log(response);
      setBatch(response);
    } catch (error) {
      console.error("Error fetching model data:", error);
    }
  }, [modelId]);

  useEffect(() => {
    fetchBatchList();
  }, [modelId, fetchBatchList]);

  const deleteHandler = async (fileId: string) => {
    try {
      await deleteBatch(modelId, fileId); // Perform the delete operation
      fetchBatchList(); // Reload the batches after deletion
    } catch (err) {
      console.error("Error deleting batch:", err);
    }
  };

  useEffect(() => {
    fetchBatchList();
  }, [modelId, fetchBatchList]);

  const downloadHandler = async (fileId: string) => {
    if (!modelId || !fileId) {
      console.log("Both Model and File ID are required.");
      return;
    }

    try {
      // Call the action function to download the file
      const blob = await downloadBatch(modelId, fileId);
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileId}.csv`; // Adjust the filename and extension as needed
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ModelSelect
        models={modelsData}
        onChange={handleModleChange}
      ></ModelSelect>
      {modelId && (
        <div>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-1 mt-8">
            <div className="mt-4">
              <h2 className="mb-3 mt-5 block text-3xl font-medium text-gray-900">
                Batches for Selected Model
              </h2>
              <div className="relative">
                {batch?.data.data.data.files.map((file: BatchFiles) => (
                  <div
                    key={file.id}
                    className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  >
                    <h3>{file.filename}</h3>
                    <p>File ID: {file.id}</p>
                    <p>Date Created: {file.timestamp}</p>
                    <div className="flex gap-5">
                      <button
                        className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                        type="button"
                        onClick={() => deleteHandler(file.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                        type="button"
                        onClick={() => downloadHandler(file.id)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
