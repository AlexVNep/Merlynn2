import { getAllModels } from "../lib/actions";
import DynamicForm from "./dynamicform";

export default async function Page() {
  const data = await getAllModels();
  const dataArray = data.data;

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-4xl">Model Forms</h1>
      <div>
        <DynamicForm modelsData={dataArray} />
      </div>
    </main>
  );
}
