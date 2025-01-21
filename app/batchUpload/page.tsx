import { getAllModels } from "../lib/actions";
import UploadForm from "./UploadForm";

export default async function Page() {
  const data = await getAllModels();
  const dataArray = data.data;

  return (
    <div>
      <UploadForm modelsData={dataArray} />
    </div>
  );
}
