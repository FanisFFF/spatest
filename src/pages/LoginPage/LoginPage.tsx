import { Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login-page.styles.scss";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendspa-i6dw.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      const token = response.data.token;

      login(token);
      navigate("/table");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          value={username}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <TextField
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </>
  );
}
export default LoginPage;
