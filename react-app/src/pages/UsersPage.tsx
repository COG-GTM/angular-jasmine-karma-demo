import { useState } from "react";
import Button from "@mui/material/Button";
import { getUsers } from "../services/usersService";
import type { User } from "../models/User";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  function handleGetUsers() {
    console.info("getUsers");
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }

  return (
    <div>
      <p>users works!</p>
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleGetUsers}
        sx={{ textTransform: "none" }}
      >
        Get Users
      </Button>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
