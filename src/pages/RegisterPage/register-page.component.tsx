import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./register-page.styles.scss";

// const BASE_LOGIN_URL = "https://backendspa-i6dw.onrender.com";
const BASE_LOGIN_URL = "http://localhost:5000";
function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${BASE_LOGIN_URL}/auth/register`, {
        username,
        password,
      });
      //   const token = response.data.token;
      const response2 = await axios.post(`${BASE_LOGIN_URL}/auth/login`, {
        username,
        password,
      });
      localStorage.removeItem("token");
      const token = response2.data.token;
      const currentUser = response2.data.username;

      login(token, currentUser);
      navigate("/table");
      //   login(token);
      //   navigate("/table");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="register-page">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div className="register">
            <form className="register-form" onSubmit={handleSubmit}>
              <h2>Create account</h2>
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
                Create account
              </Button>
            </form>
            <div className="login__create-account">
              <div className="login__divider">
                <div className="strike-through"></div>
                <span>or</span>
                <div className="strike-through"></div>
              </div>
              <Link to="/login">
                <Button>Log In</Button>
              </Link>
            </div>
          </div>
        )}

        {error && <Typography color="error">{error}</Typography>}
      </div>
    </>
  );
}
export default RegisterPage;
