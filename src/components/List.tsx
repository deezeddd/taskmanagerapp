import React, { useState } from "react";
import { ITask } from "./Home";
import CheckBox from "../check.svg";
import Circle from "../circle.svg";

export default function List({
  displayTasks,
  setTask,
  setDisplayTasks,
}: {
  displayTasks: ITask[];
  setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
  setDisplayTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) {
  const [value, setValue] = useState<string>("");

  const updateLocalStorage = (tasks: ITask[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleStatus = (key: number) => {
    const newTask = [...displayTasks];
    newTask[key].completed = !newTask[key].completed;

    setDisplayTasks(newTask);
    setTask(newTask); 
    updateLocalStorage(newTask); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value !== "") {
      const newTask = { name: value, completed: false };
      const updatedTasks = [...displayTasks, newTask];

      setDisplayTasks(updatedTasks);
      setTask(updatedTasks);
      updateLocalStorage(updatedTasks);
      setValue("");
    } else {
      alert("Please Enter Something");
    }
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    e.stopPropagation();
    const updatedItems = displayTasks.filter(
      (_, index: number) => index !== key
    );

    setDisplayTasks(updatedItems);
    setTask(updatedItems);
    updateLocalStorage(updatedItems); 
  };

  return (
    <div className="mb-3">
      {displayTasks.map((item: ITask, key: number) => (
        <div
          className={`flex justify-between cursor-pointer rounded-md border-2 mb-3 ${
            item.completed ? "bg-green-100" : "bg-gray-50"
          }`}
          onClick={() => handleStatus(key)}
          key={key}
        >
          <div className={`text-sm h-10 p-2.5 flex`}>
            {item.completed ? (
              <img src={CheckBox} alt="Checkbox" />
            ) : (
              <img src={Circle} alt="circle" className="mr-3 ml-2" />
            )}{" "}
            {item.name}
          </div>
          <button
            className="mr-5 text-sm text-gray-400"
            onClick={(e) => handleDelete(e, key)}
          >
            X
          </button>
        </div>
      ))}

      <form
        action="submit"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <div className="flex flex-col">
          <input
            placeholder="Type Something"
            className="text-sm h-10 p-2.5 rounded-md border-2 mb-3"
            name="task"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
          />
          <button className="bg-black text-gray-300 text-sm h-10">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
