import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function App() {
  const [{}, dispatch] = useStateValue();
  const user = localStorage.getItem("user");
  useEffect(() => {
    const userJSON = JSON.parse(user);
    dispatch({
      type: actionTypes.SET_USER,
      user: userJSON,
    });
  }, [user]);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Sidebar />
                    <Chat />
                  </>
                }
              />
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Sidebar />
                    <Chat />{" "}
                  </>
                }
              />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
