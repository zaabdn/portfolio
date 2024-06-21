import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ExperienceRecord from "./interface/experience";

interface ApiResponse {
  records: ExperienceRecord[];
}

function App() {
  const [count, setCount] = useState(0);
  const [dataExperiences, setDataExperiences] = useState<ApiResponse>({
    records: [],
  });

  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        "https://api.airtable.com/v0/app0bJmhrbFR4Stk4/experiences",
        {
          headers: {
            Authorization:
              "Bearer patQg4hrbDvUXq1bu.5d5001a9b110cc709a192df23844aeee6a934989e72c389f6390bd13d24303a3",
          },
        }
      );

      const data: ApiResponse = await response.json();

      setDataExperiences(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {dataExperiences.records.map((item) => (
        <p>{item.fields.title}</p>
      ))}
      <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
