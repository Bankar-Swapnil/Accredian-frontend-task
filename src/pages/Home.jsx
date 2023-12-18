import React from "react";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home({ children }) {
  return (
    <div>
      <ToastContainer />
      <Header />
      {children}
    </div>
  );
}

export default Home;
