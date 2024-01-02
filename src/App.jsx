import { useEffect } from "react";
import { useState } from "react";



const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState(() => {
    // Initialize tasks from localStorage or as an empty array
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

    // // Load tasks from localStorage on initial render
    // useEffect(() => {
    //   const storedTasks = localStorage.getItem('tasks');
    //   if (storedTasks) {
    //     setTasks(JSON.parse(storedTasks));
    //   }
    // }, []);

     // Save tasks to localStorage whenever 'tasks' state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const taskHandler = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title, description }]);
    setTitle('');
    setDescription('');
  };

  const deleteHandler = (i) => {
    const updatedTasks = tasks.filter((_, index) => index !== i);
    setTasks(updatedTasks);
    // Remove the deleted task from localStorage as well
    // Move localStorage update to useEffect
  };

// const deleteHandler = (i) => {
//   let reminder = [...tasks]
//   reminder.splice(i,1)
//   setTasks(reminder)

// }



let initialTask = null; // Initialize as null
if (tasks.length) {
  initialTask = tasks.map((t, i) => (
    <li key={i} className="flex flex-col md:flex-row items-center justify-between px-8">
      <div className="flex flex-col md:flex-row gap-10 justify-between md:w-[85%] text-center overflow-y-auto">
        <h3 className="font-semibold text-2xl">{t.title}</h3>
        <h5 className="font-medium text-lg ">{t.description}</h5>
      </div>
      <button onClick={() => deleteHandler(i)} className="bg-red-400 font-bold p-2 rounded">Delete</button>
    </li>
  ));
} else {
  initialTask = <h2 className="text-center">No Task Available</h2>;
}





  return (
    <>
    {/* nav  */}
    <nav className="bg-black text-white font-bold text-4xl text-center p-5">
     TODO List
     </nav>
{/* add task  */}
<form onSubmit={taskHandler}
 className="px-10 py-10  text-center flex gap-4 md:gap-10 flex-col md:flex-row justify-center items-center">
  <input type="text"
   placeholder="Enter Your Task"
   className="text-2xl px-3 py-2 border-2 border-black outline-none"
   value={title}
   onChange={(e) => setTitle(e.target.value)}
   required
   />
  <input type="text"
   placeholder="Enter Your Description"
   className="text-2xl px-3 py-2 border-2 border-black outline-none "
   value={description}
   onChange={(e) => setDescription(e.target.value)}
   required
   />
  <input type="submit"
   value="Add Task"
   className="text-2xl px-3 py-3 bg-black text-white rounded-md"
   />
</form>
    <p className="bg-black h-[2px] w-[80%] mx-auto mb-8"></p>
    {/* show tasks  */}
    <div className="bg-slate-300 py-8 px-2 md:w-[80%] mx-auto">
  <ul className="space-y-4">
    {initialTask}
  </ul>
</div>
    
    </>
  )
}

export default App