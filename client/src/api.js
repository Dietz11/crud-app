import axios from 'axios';

const API_URL = 'https://netlify-crud-app.herokuapp.com/api/todo';

export const getTodos = () => {
  return axios.get(API_URL);
};

export const createTodo = (text) => {
  return axios.post(API_URL, { text });
};

export const updateTodo = (id, updates) => {
  return axios.put(`${API_URL}/${id}`, updates);
};

export const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
