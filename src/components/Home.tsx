import { useState } from "react";
import Bar from "./Bar";
import List from "./List";
export interface ITask {
  name: string;
  completed: Boolean
}

export default function Home() {
const [task, setTask] = useState<ITask[]>([]);

  return (
    <div className="p-10 w-[100%] mt-40">
        <Bar/>
        <List task={task} setTask={setTask} />
    </div>
  )
}
