import React, { useState, useEffect } from "react";
import handleUsers from "../services/handleUsers";
import { useNavigate } from "react-router-dom";

export default function Login({setAuth}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [users, setUsers] = useState([]);
  const [statusMessages, setStatusMessages] = useState({});
  const [show, setShow] = useState({
    form: true,
    logOut: false
  });


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
      (x) =>
        x.username.toLowerCase() === user.username.toLowerCase() ||
        x.email.toLowerCase() === user.username.toLowerCase()
    );
    if (usercheck) {
      // setStatusMessages({ message: messages.login, name: usercheck.name });
      // setUser({ username: "", password: "" })
      // setShow({ logOut: true, form: false });
      setAuth(usercheck);
      navigate("/profile", { replace: true });
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
    setUser({ username: "", password: "" })
    // setUsername("");
    // setPassword("");
    setStatusMessages({});
    setShow({ form: true, logOut: false });
  };

  const renderLogOut = () =>
    show.logOut && (
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
    return show.form &&
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container floating-label-content">
          <input
            className="floating-input"
            placeholder=" "
            required
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })} />
          <label className="label floating-label">Username or email</label>
        </div>
        <div className="input-container floating-label-content">
          <input
            className="floating-input"
            placeholder=" "
            required
            minLength="6"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })} />
          <label className="label label floating-label">Password</label>
        </div>
        <div className="input-container">
          <button type="submit">Login</button>
        </div>
      </form>;
  }
}
