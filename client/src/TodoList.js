import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import './TodoList.scss';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    refreshTodos();
  }, []);

  const refreshTodos = () => {
    getTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNewTodoChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    createTodo(newTodoText)
      .then((response) => {
        setNewTodoText('');
        refreshTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTodoUpdate = (id, updates) => {
    updateTodo(id, updates)
      .then(() => {
        refreshTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTodoDelete = (id) => {
    deleteTodo(id)
      .then(() => {
        refreshTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form className="todo-list__form" onSubmit={handleNewTodoSubmit}>
        <input type="text" value={newTodoText} onChange={handleNewTodoChange} placeholder="Add new task" />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list__items">
        {todos.map((todo) => (
          <div className={`todo-list__item ${todo.completed ? 'todo-list__item--completed' : ''}`} key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) =>
                handleTodoUpdate(todo._id, { completed: event.target.checked })
              }
            />
            <span className="todo-list__item-text">{todo.text}</span>
            <div className="todo-list__item-actions">
              <button
                className={`todo-list__item-edit ${todo.completed ? 'todo-list__item-edit--disabled' : ''}`}
                onClick={() =>
                  handleTodoUpdate(todo._id, { text: prompt('Enter new text for the task:', todo.text) })
                }
                disabled={todo.completed}
              >
                Edit
              </button>
              <button
                className="todo-list__item-delete"
                onClick={() => handleTodoDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
