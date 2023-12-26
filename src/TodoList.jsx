import { useState, useEffect } from "react";
import deleteIcon from "./assets/delete.png";
import EditIcon from "./assets/edit.png";

export default function TodoList() {
  const [inputTask, setInputTask] = useState("");
  const [list, setList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editInputTask, setEditInputTask] = useState("");

  const handleInput = (e) => {
    setInputTask(e.target.value);
  };

  const handleTodo = (todo) => {
    const newTask = {
      id: Math.random(),
      todo: todo,
      completed: false,
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

  const handleEdit = (todo) => {
    setEditTodo(todo.id);
    setEditInputTask(todo.todo);
  };
  const handleSaveEdit = (id) => {
    const updatedList = list.map((todo) => (todo.id === id ? { ...todo, todo: editInputTask } : todo));
    setList(updatedList);
    setEditTodo(null);
  };
  const handleComplete = (id) => {
    const updatedList = list.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setList(updatedList);
  };

  return (
    <>
      <div className="container-fluid overflow-hidden h-screen flex justify-center items-star py-5 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        <div className="wrapper-todo  p-5 h-auto rounded-md  border-2 border-white">
          <div className="tagline text-center">
            <h1 className="text-4xl font-bold text-white ">Todo List</h1>
          </div>
          <div className="input-wrapper text-center mt-5">
            <input className="border-2 outline-none  w-[350px] p-2 mr-7 rounded-md" type="text" value={inputTask} placeholder="Enter Task" onChange={handleInput} />
            <button className="bg-teal-500 w-[100px] p-2 text-white rounded-xl" onClick={() => handleTodo(inputTask)}>
              ADD
            </button>
          </div>
          <div className="todo-wrapper m-auto mt-6 w-[600px] h-[400px] rounded-lg overflow-y-auto ">
            <ul className="w-full p-5">
              {list.map((todo) => (
                <li key={todo.id} className={`flex justify-between mb-5 px-4 py-4 ${todo.completed ? "line-through text-gray-500" : "bg-[#FFF7D4]"}`}>
                  {editTodo === todo.id ? <input type="text" value={editInputTask} onChange={(e) => setEditInputTask(e.target.value)} className="p-2" /> : <p className="text-lg">{todo.todo}</p>}
                  <div className="flex items-center gap-3">
                    {editTodo === todo.id ? (
                      <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleComplete(todo.id)} className="text-red-900">
                          {todo.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => handleEdit(todo)}>
                          <img src={EditIcon} alt="edit icon" className="w-[19px] h-[19px]" />
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDelete(todo.id)}>
                      <img src={deleteIcon} alt="delete icon" />
                    </button>
                  </div>
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
