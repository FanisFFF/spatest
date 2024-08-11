import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login-page.styles.scss";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BASE_URL } from "../../api/baseUrl";

function LoginPage() {
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
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;
      const currentUser = response.data.username;
      login(token, currentUser);
      navigate("/home");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login__icon">
          <BorderColorIcon></BorderColorIcon>
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
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
              <Link to="/register">
                <Button>Create account</Button>
              </Link>
            </div>
          </div>
        )}

        {error && <Typography color="error">{error}</Typography>}
      </div>
    </>
  );
}
export default LoginPage;
