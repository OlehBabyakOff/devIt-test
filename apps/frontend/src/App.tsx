import { useState, useEffect, useRef } from "react";

import { RequestForm } from "@components/RequestForm";

import { fetchIndex } from "@services/fetch-index";

function App() {
  // TODO update response type
  const [responses, setResponses] = useState<any[]>([]);

  const lastItemRef = useRef<HTMLLIElement | null>(null);

  // TODO update response type
  const handleSubmit = async (input: number) => {
    const res = await fetchIndex(input);

    return res;
  };

  // TODO update response type
  const handleResponse = (response: any) => {
    setResponses((prev) => [...prev, response]);
  };

  useEffect(() => {
    lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center gap-6">
        <div className="border-4 border-blue-500 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-lg bg-white w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-5">
            DevIt data fetch
          </h1>
          <RequestForm onSubmit={handleSubmit} onResponse={handleResponse} />
        </div>

        <div className="border-4 border-blue-500 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-lg bg-white w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-5">
            Responses
          </h1>
          <div className="w-full h-96 overflow-y-auto">
            <ul className="space-y-2">
              {responses.map((res, i) => (
                <li
                  key={i}
                  ref={i === responses.length - 1 ? lastItemRef : null}
                  className={`${res.status === "Success" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"} px-4 py-2 rounded-lg shadow-sm break-words`}
                >
                  {JSON.stringify(res)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
