import React, { useState } from 'react'
import { ITask } from './Home';

export default function List({task, setTask}: {task: ITask[], setTask: React.Dispatch<React.SetStateAction<ITask[]>>}) {
    const [value, setValue] = useState<string>('');

    const handleStatus = (key: number) =>{
        const newTask = [...task];
        newTask[key].completed = !newTask[key].completed;
        setTask(newTask);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(value !== "") {
            setTask([...task, { name: value, completed: false }]);
            setValue("");
            
        }
        else{
            alert("Please Enter Something");
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, key: number)=>{
        e.stopPropagation();
        const updatedItems = task.filter(
        (_, index: number) => index !== key);
        setTask(updatedItems);
    }
  return (
    <div className="mb-3">
      {task.map((item: ITask, key: number) => (
        <div
          className={`flex justify-between cursor-pointer rounded-md border-2 mb-3 ${
            item.completed ? "bg-green-100" : "bg-gray-50"
          }`}
          onClick={() => handleStatus(key)}
          key={key}
        >
          <div className={` text-sm h-10 p-2.5 ml-4 `}>O {item.name} </div>
          <button
            className="mr-5 text-sm text-gray-400 "
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
        <div className="flex flex-col ">
          <input
            placeholder="Type Something"
            className="text-sm h-10 p-2.5 rounded-md border-2 mb-3"
            name="task"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
          />
          <button className="bg-black text-gray-300 text-sm h-10 ">
            Add Text
          </button>
        </div>
      </form>
    </div>
    //Add Task To the list, remove tasks from the list, mark complete incomplete to the same
  );
}

