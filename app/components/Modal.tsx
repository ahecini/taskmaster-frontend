"use client"
import { useState, useEffect } from "react";
import createTask from '../API/createTask';

interface closeFunctionProps{
    closeFunction: ()=>void
}

export default function Modal({ closeFunction = () => {} }: closeFunctionProps) {

  const [taskName, setTaskName] = useState("");  

  const onChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    setTaskName(e.currentTarget.value);
  };

  const addFunction = () => {
    console.log(taskName);
  }

  const addTask = async () => {
    try{
      var json = {"name":taskName};
      const response = await createTask(json);
      console.log("yes!")
    }catch(error){
      if(typeof error=== "string"){
        console.error(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Create a new task</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">Task name</p>
            <div className="border"> 
              <input onChange={onChange}/>
            </div>
          </div>
          <div className="flex justify-center mt-4">

            {/* Navigates back to the base URL - closing the modal */}
            <a
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 mr-5"
              onClick={addTask}
            >
              Add
            </a>
            <a
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={closeFunction}
            >
              Close
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}