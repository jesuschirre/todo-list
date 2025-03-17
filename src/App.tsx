import { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<string>("");
  const url = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Solo traigo los primeros 10 para que no sea tan largo
        const first10 = data.slice(0, 10);
        setTodo(first10);
        console.log("TODOs cargados:", data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      alert("Escribe algo antes de agregar");
      return;
    }

    const newTodoItem: Todo = {
      userId: 1,
      id: todo.length > 0 ? todo[todo.length - 1].id + 1 : 1, 
      title: newTodo,
      completed: false,
    };
    

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Nuevo TODO agregado:", data);
        setTodo((prevTodos) => [...prevTodos, newTodoItem]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error al agregar el TODO:", error);
      });
  };

  const handleDeleteTodo = (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (!confirmDelete) return;

    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el TODO");
        }

        setTodo(todo.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el TODO:", error);
      });
  };

  const handleEditTodo = (index: number) => {
    setEditIndex(index);
    setEditTodo(todo[index].title);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editTodo.trim() !== "" && editIndex !== null) {
      const updatedTodos = todo.map((item, index) =>
        index === editIndex ? { ...item, title: editTodo } : item
      );

      setTodo(updatedTodos);
      setEditIndex(null);
      setEditTodo("");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <h1 className="text-6xl text-center uppercase text-blue-600 font-bold">Todo list</h1>

        <form onSubmit={handleAddTodo} className="flex items-center justify-center mt-10">
          <input
            type="text"
            placeholder="Add todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border-2 border-gray-400 p-1 w-1/2"
          />
          <button type="submit" className="bg-blue-500 text-white p-1.5 ml-4 rounded-lg">
            Add
          </button>
        </form>

        <ul className="mt-5 flex flex-col">
          {todo.map((item, index) => (
            <li key={item.id} className="flex items-center justify-between border p-2 m-2">
              <div>
                <span className="font-bold mr-4">#{item.id}</span>
                <span>{item.title}</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleDeleteTodo(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleEditTodo(index)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>

        {editIndex !== null && (
          <form onSubmit={handleSaveEdit} className="flex items-center justify-center mt-10">
            <input
              type="text"
              placeholder="Edit todo"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="border-2 border-gray-400 p-1 w-1/2"
            />
            <button type="submit" className="bg-green-500 text-white p-1.5 ml-4 rounded-lg">
              Save
            </button>
          </form>
        )}
      </div>

    </>
  );
}

export default App;
