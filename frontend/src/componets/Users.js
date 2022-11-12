import UserDetail from "./UserDetail";
import React, { useState, useEffect } from "react";

function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <>
      <h1>All Users</h1>

      <div className="row">
        {users &&
          users.length > 0 &&
          users.map((user, index) => <UserDetail key={user.id} users={user} />)}
      </div>
    </>
  );
}

export default Users;
