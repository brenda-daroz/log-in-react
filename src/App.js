import './App.css';
import LogIn from './components/LogIn';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('auth')) || false
  );

  const setAuth = (value) => {
    setIsAuthenticated(value);
    //alert(value);
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/profile"
            element={isAuthenticated
              ? <Profile />
              : <Navigate to="/" replace />
            }
          />
          <Route path="/" element={<LogIn setAuth={setAuth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
