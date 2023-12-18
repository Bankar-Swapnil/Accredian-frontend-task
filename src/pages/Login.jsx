import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import axios from "axios";
import { toast } from "react-toastify";
import "./Style.css";

function Login() {
  const [usernameOrEmail, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const isFormValidated = () => {
    let isValid = true;

    // Password validation
    if (password === "" || password.length < 4) {
      setErrors("Password must be at least 4 characters long");
      isValid = false;
    }

    return isValid;
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      if (isFormValidated()) {
        const data = {
          usernameOrEmail: usernameOrEmail,
          password: password,
        };
        const response = await axios.post(
          "http://localhost:4001/auth/login",
          data,
          {
            withCredentials: true,
          }
        );
        toast("successfully logged in", {
          style: {
            backgroundColor: "blue",
            color: "white",
          },
        });
        window.localStorage.setItem("userId", response.data.username);
        navigate("/dashboard");
      } else {
        toast(errors, {
          style: {
            backgroundColor: "blue",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast(error.response.data.message, {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
    }
  };

  return (
    <Home>
      <div className="container mt-10">
        <div className="image-container">
          <img src={require("../img/login.jpg")} alt="err" />
        </div>
        <div className="form-container">
          <Typography
            variant="h4"
            gutterBottom
            className="font-bold text-black-700 mb-2"
          >
            Sign In
          </Typography>
          <form onSubmit={onLogin}>
            <TextField
              required
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              type="text"
              onChange={(e) => setEmailOrUsername(e.target.value)}
              value={usernameOrEmail}
              className={"text-white font-normal"}
            />
            <TextField
              required
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={"font-normal"}
            />
            <div className="button-container">
              <Button
                type="submit"
                variant="contained"
                className="bg-blue-700 rounded-none mt-"
              >
                Login
              </Button>
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-blue-700 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Home>
  );
}

export default Login;
