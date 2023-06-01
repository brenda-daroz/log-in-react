import React, { useState, useEffect } from "react";
import handleUsers from "../services/handleUsers";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [statusMessages, setStatusMessages] = useState({});
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(true);

  const messages = {
    username: "Invalid username. Try again.",
    login: "You have successfully logged into your account!"
  };

  const renderStatusMessage = () => (
    <>
      <p className="status-message-user">{statusMessages.name}</p>
      <p className="status-message ">{statusMessages.message}</p>
    </>
  );

  const checkUser = () => {
    const usercheck = users.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === username.toLowerCase()
    );
    if (usercheck) {
      setStatusMessages({ message: messages.login, name: usercheck.name });
      setUsername("");
      setPassword("");
      setShow(true);
      setForm(false)
    } else {
      setStatusMessages({ message: messages.username });
    }
    console.log(usercheck);
  };

  const getUsers = async () => {
    try {
      const response = await handleUsers();
      setUsers(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setStatusMessages({});
    setShow(false);
    setForm(true)
  };

  const renderLogOut = () =>
    show && (
      <button className="visible" onClick={handleLogOut}>
        Log out
      </button>
    );

  return (
    <div className="container">
      <h1 className="title">Sign in</h1>
      {formLogIn()}
      {renderStatusMessage()}
      {renderLogOut()}
    </div>
  );

  function formLogIn() {
    return form &&
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container floating-label-content">
          <input
            className="floating-input"
            placeholder=" "
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <label className="label floating-label">Username or email</label>
        </div>
        <div className="input-container floating-label-content">
          <input
            className="floating-input"
            placeholder=" "
            required
            minLength="6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <label className="label label floating-label">Password</label>
        </div>
        <div className="input-container">
          <button type="submit">Login</button>
        </div>
      </form>;
  }
}
