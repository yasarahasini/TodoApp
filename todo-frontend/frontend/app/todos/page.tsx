"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const router = useRouter();

  // ✅ stable function (prevents Turbopack crash)
  const loadTodos = useCallback(async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load todos");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    loadTodos();
  }, [router, loadTodos]);

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

  const deleteTodo = async (id: number) => {
    if (!confirm("Delete this todo?")) return;

    try {
      await api.delete(`/todos/${id}`);
      loadTodos();
    } catch (err) {
      console.error(err);
      alert("Failed to delete todo");
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const saveEdit = async (id: number) => {
    if (!editingTitle.trim()) return;

    try {
      await api.patch(`/todos/${id}`, { title: editingTitle });
      setEditingId(null);
      setEditingTitle("");
      loadTodos();
    } catch (err) {
      console.error(err);
      alert("Failed to update todo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          My Todos
        </h2>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              {editingId === todo.id ? (
                <input
                  className="flex-1 mr-2 p-1 border rounded text-black"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              ) : (
                <span
                  className={`flex-1 text-black ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              )}

              <div className="flex gap-2">
                {editingId === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(todo)}
                    className="px-3 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
