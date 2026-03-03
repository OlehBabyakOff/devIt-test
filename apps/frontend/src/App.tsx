import { useEffect, useRef } from "react";

import { RequestForm } from "@components/RequestForm";

import { useRequest } from "@hooks/useRequest";

function App() {
  const { results, successfulResults, run, isRunning } = useRequest();

  const lastItemRef = useRef<HTMLLIElement | null>(null);

  const handleSubmit = (limit: number) => {
    run(1000, limit);
  };

  // scroll results to the last item
  useEffect(() => {
    lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center gap-6">
        <div className="border-4 border-blue-500 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-lg bg-white w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-5">
            DevIt data fetch
          </h1>
          <RequestForm onSubmit={handleSubmit} isRunning={isRunning} />
        </div>

        <div className="border-4 border-blue-500 rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-lg bg-white w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 text-center">
            Responses
          </h1>
          {successfulResults > 1 && (
            <p className="text-2xl font-semibold text-blue-600 text-center mb-5">
              successful: {successfulResults}
            </p>
          )}
          <div className="w-full h-96 overflow-y-auto">
            <ul className="space-y-2">
              {results.map((res, i) => (
                <li
                  key={i}
                  ref={i === results.length - 1 ? lastItemRef : null}
                  className={
                    "bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-sm break-words"
                  }
                >
                  {res}
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
