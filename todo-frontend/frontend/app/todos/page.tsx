"use client";

import { useEffect, useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/navigation";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadTodos();
  }, [router]);

  const loadTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load todos");
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/todos", { title });
      setTitle("");
      loadTodos();
    } catch (err) {
      console.error(err);
      alert("Failed to add todo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          My Todos
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-blacka px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center text-black bg-gray-200 p-3 rounded-md shadow-sm"
            >
              <span className={todo.completed ? "line-through text-black" : ""}>
                {todo.title}
              </span>
              {todo.completed && <span className="text-green-500">✅</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
