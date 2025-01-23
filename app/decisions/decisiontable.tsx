import { fetchFilteredDecisions } from "../lib/data";
import { MongoReturn } from "../lib/definitions";

export default async function DecisionsTable() {
  const decisions = JSON.parse(await fetchFilteredDecisions());

  console.log("Decisions in Table:", decisions); // Debugging

  if (decisions && decisions.length > 0) {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {decisions.map((decision: MongoReturn) => (
                <div
                  key={decision._id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{decision._id}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {decision.data.attributes.decision}
                      </p>
                    </div>
                    <p>{decision.data.attributes.confidence}</p>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <p>{decision.data.attributes.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Decision
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Confidence
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {decisions?.map((decision: MongoReturn) => (
                  <tr
                    key={decision._id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{decision._id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {decision.data.attributes.decision}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {decision.data.attributes.confidence}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {decision.data.attributes.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No decisions found</p>
      </div>
    );
  }
}
