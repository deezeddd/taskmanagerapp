import { useContext, useState, useEffect } from "react";
import Bar from "./Bar";
import List from "./List";
import { TaskContext } from "../context/Task";

export interface ITask {
  name: string;
  completed: Boolean;
}

export default function HomePage() {
  const { task, setTask } = useContext(TaskContext); // Original task list
  const [displayTasks, setDisplayTasks] = useState<ITask[]>([...task]); 

  useEffect(() => {
    setDisplayTasks([...task]);
  }, [task]);

  return (
    <div className="p-10 md:p-12 w-full mt-40">
      <Bar task={task} setDisplayTasks={setDisplayTasks} />
      <List setTask = {setTask} displayTasks={displayTasks} setDisplayTasks={setDisplayTasks} />
    </div>
  );
}
