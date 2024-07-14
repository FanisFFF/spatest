import { Button, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login-page.styles.scss";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const BASE_LOGIN_URL = "https://backendspa-i6dw.onrender.com";
// const BASE_LOGIN_URL = "http://localhost:5000";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_LOGIN_URL}/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;

      login(token);
      navigate("/table");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login__icon">
          <BorderColorIcon></BorderColorIcon>
        </div>
        <div className="login">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Join now</h2>
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
          <div className="login__create-account">
            <div className="login__divider">
              <div className="strike-through"></div>
              <span>or</span>
              <div className="strike-through"></div>
            </div>
            <a href="#">
              <Button>Create account</Button>
            </a>
          </div>
        </div>
        {error && <Typography color="error">{error}</Typography>}
      </div>
    </>
  );
}
export default LoginPage;
