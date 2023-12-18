import { Button } from "@mui/material";
import React from "react";
import Home from "./Home";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await axios.get("http://localhost:4001/auth/logout", {
        withCredentials: true,
      });
      window.localStorage.clear();
      toast("Successfully logged out");
      navigate("/");
    } catch (error) {
      toast("Logout unsuccessfull");
    }
  };

  return (
    <Home>
      <div className=" flex flex-col justify-center items-center h-96">
        <p className=" py-4">This is dashboard page</p>
        <Button variant="contained" onClick={onLogout}>
          logout
        </Button>
      </div>
    </Home>
  );
}

export default Dashboard;
