import React, { createContext, useEffect, useState } from "react";
import { ITask } from "../components/Home"; 

export const TaskContext = createContext<{
  task: ITask[];
  setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
}>({
  task: [],
  setTask: () => {}
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [task, setTask] = useState<ITask[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  );
};
