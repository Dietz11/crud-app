import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import './TodoList.scss';

function TodoList({ role }) {
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
      .then((response) => {
        refreshTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTodoDelete = (id) => {
    deleteTodo(id)
      .then((response) => {
        refreshTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const canAddTask = role === 'Admin' || role === 'User';
  const canEditTask = role === 'Admin';
  const canDeleteTask = role === 'Admin'|| role === 'User';
  const canCheckmarkTask = role === 'User' || role === 'Admin';

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      {canAddTask && (
        <form className="todo-list__form" onSubmit={handleNewTodoSubmit}>
          <input
            type="text"
            value={newTodoText}
            onChange={handleNewTodoChange}
            placeholder="Add new task"
          />
          <button type="submit">Add</button>
        </form>
      )}
      <div className="todo-list__items">
        {todos.map((todo) => (
          <div
            className={`todo-list__item ${
              todo.completed ? 'todo-list__item--completed' : ''
            }`}
            key={todo._id}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                canCheckmarkTask &&
                handleTodoUpdate(todo._id, { completed: !todo.completed })
              }
            />
            {canEditTask ? (
              <input
                type="text"
                value={todo.text}
                onChange={(event) =>
                  handleTodoUpdate(todo._id, { text: event.target.value })
                }
              />
            ) : (
              <span>{todo.text}</span>
            )}
            {canDeleteTask && (
              <button onClick={() => handleTodoDelete(todo._id)}>Delete</button>
            )}
          </div>
        ))}
       </div>
</div>
);
}

export default TodoList;
