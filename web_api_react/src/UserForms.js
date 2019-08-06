import React, { useState } from "react";

import axios from "axios";

export default function UserForm({ addUser }) {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    bio: ""
  });
  const changeHandler = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <form onSubmit={e => addUser(e, formData)}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={changeHandler}
        />
        <input
          type="textarea"
          name="bio"
          placeholder="Enter bio"
          value={formData.bio}
          onChange={changeHandler}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
