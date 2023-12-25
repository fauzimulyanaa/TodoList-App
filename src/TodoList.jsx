import { useState, useEffect } from "react";
import deleteIcon from "./assets/delete.png";

export default function TodoList() {
  const [inputTask, setInputTask] = useState("");
  const [list, setList] = useState([]);

  const handleInput = (e) => {
    setInputTask(e.target.value);
  };

  const handleTodo = (todo) => {
    const newTask = {
      id: Math.random(),
      todo: todo,
    };

    setList([...list, newTask]);
    setInputTask("");
  };

  const handleDelete = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("list")) || [];
    if (storedTodos.length > 0) {
      setList(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="container-fluid overflow-hidden h-screen flex justify-center items-star py-5 bg-[url('/bg.jpg')]">
        <div className="wrapper-todo shadow-2xl p-5 h-auto rounded-md bg-white ">
          <div className="tagline text-center">
            <h1 className="text-3xl font-bold text-black">Todo List</h1>
          </div>
          <div className="input-wrapper text-center mt-5">
            <input className="border-2 outline-none border-slate-300 w-[350px] p-2 mr-7 rounded-md" type="text" value={inputTask} placeholder="Enter Task" onChange={handleInput} />
            <button className="bg-teal-500 w-[100px] p-2 text-white rounded-xl" onClick={() => handleTodo(inputTask)}>
              ADD
            </button>
          </div>
          <div className="todo-wrapper m-auto mt-6 w-[600px] h-[300px] rounded-lg">
            <ul className="w-full p-5">
              {list.map((todo) => (
                <li key={todo.id} className="flex justify-between mb-5 bg-yellow-200 px-4 py-4">
                  <p className="text-lg">{todo.todo}</p>
                  <button onClick={() => handleDelete(todo.id)}>
                    <img src={deleteIcon} alt="delete icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
