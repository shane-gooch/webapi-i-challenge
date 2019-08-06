import React, { useState, useEffect } from "react";
import axios from "axios";

import Users from "./Users";
import UserForm from "./UserForms";

import "./App.css";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  const addUser = (e, formData) => {
  
    e.preventDefault();
    axios.post("http://localhost:8000/api/users", formData).then(res => {
      const updatedUser = res.data;
      console.log("data", res);
      setUsers({
        ...users,
        updatedUser
      });
    });
  };
  return (
    <div className="App">
      <h1>Users List</h1>
      <UserForm addUser={addUser} />
      <Users users={users} />
    </div>
  );
}

export default App;
