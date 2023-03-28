// /client/src/App.js
import React, { useState } from 'react';
import TodoList from './TodoList';
import LoginForm from './LoginForm';

function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setAuth({ isAuthenticated: true, role: 'Admin' });
    } else if (username === 'user' && password === 'user') {
      setAuth({ isAuthenticated: true, role: 'User' });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        <TodoList role={auth.role} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
