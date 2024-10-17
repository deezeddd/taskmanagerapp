import React, { useEffect, useState } from "react";
import { ITask } from "./Home";

export default function Bar({
  task,
  setDisplayTasks,
}: {
  task: ITask[];
  setDisplayTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<Boolean | null>(null);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm); // Debounced value
    

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm); 
      }, 400); 

      // if user types again within the delay period
      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);

    useEffect(() => {
      handleFilterTask(debouncedSearchTerm, status);
    }, [debouncedSearchTerm, status]);



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
  };

  const handleStatus = (value: Boolean | null) => {
    setStatus(value);
    handleFilterTask(searchTerm, value);
  };

  const handleFilterTask = (search: string, filterStatus: Boolean | null) => {
    let filteredTasks = [...task];

    if (search === "" || search === null) {
      setDisplayTasks(task);
    }

    if (filterStatus !== null) {
      filteredTasks = filteredTasks.filter(
        (task) => task.completed === filterStatus
      );
    }

    // search filter
    if (search) {
      filteredTasks = filteredTasks.filter((task) =>
        task.name.toLowerCase().includes(search)
      );
    }

    setDisplayTasks(filteredTasks);
  };

  return (
    <div>
      <ul className="w-full flex mb-3 justify-between items-center flex-col sm:flex-row">
        <li className="font-bold mb-2 sm:mb-0">Today</li>
        <li className="mb-2 sm:mb-0">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-gray-200 rounded-3xl w-full text-sm h-10 pl-4 
             sm:w-48 md:w-[20rem] lg:w-[30rem] xl:w-[50rem]"
          />
        </li>
        <li>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatus(null);
                setDisplayTasks([...task]); // Reset to the original list
              }}
              className={`border-2 border-gray-200 rounded-md bg-gray-200 text-sm w-14 h-10 ${
                status === null ? "bg-green-400" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatus(true)}
              className={`border-2 border-gray-200 rounded-md text-sm h-10 w-24 ${
                status === true ? "bg-green-400" : ""
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleStatus(false)}
              className={`border-2 border-gray-200 rounded-md text-sm h-10 w-24 ${
                status === false ? "bg-green-400" : ""
              }`}
            >
              Incomplete
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
