import React from "react";

export default function Users({ users }) {
  console.log(users);
  return (
    <div className="users">
      {users &&
        users.map(user => {
          return (
            <div>
              <h3>{user.name}</h3>
              <p>{user.bio}</p>
            </div>
          );
        })}
    </div>
  );
}
