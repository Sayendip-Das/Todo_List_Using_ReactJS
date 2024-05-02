import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For Editing the changes and reflect back the changes to same todo list
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);

      const updatedTodo = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );

      setTodos(updatedTodo);
      // After editing editId value should be zero
      setEditId(0);

      // input should be blank every time we either edit or add
      setTodo("");
      return;
    }

    // Add the todo value with unique id provided
    if (todo != " ") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);

      // input should be blank every time we either edit or add
      setTodo("");
    }
  };

  // Delete the todo item using filter method
  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };

  // Edit the todo item using find method
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Todo List</h1>
          <form className="todoform" onSubmit={handleSubmit}>
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" id="add">
              {editId ? "Edit" : "Add"}
            </button>
          </form>

          <ul className="allTodos">
            {todos.map((t) => (
              <li className="singleTodo" key={t.id}>
                <span className="todoText">{t.todo}</span>
                <div className="btns">
                  <button className="btn-edit" onClick={() => handleEdit(t.id)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
