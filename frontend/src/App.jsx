import React from "react";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./features/auth/PrivateRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import AdminDash from "./pages/AdminDash";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./components/Project/ProjectPage";
import CreateProject from "./components/Project/CreateProject";
import OwnProjects from "./components/Project/OwnProjects";
import ProjectDash from "./components/Project/ProjectDash";
import TaskCard from "./components/Project/TaskCard";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/createproject"
          element={
            <PrivateRoute>
              <CreateProject />
            </PrivateRoute>
          }
        />

        <Route
          path="/getallproject"
          element={
            <PrivateRoute>
              <OwnProjects />
            </PrivateRoute>
          }
        />

        <Route
          path="/getproject/:id"
          element={
            <PrivateRoute>
              <ProjectDash />
            </PrivateRoute>
          }
        />

        <Route
          path="/taskcard"
          element={
            <PrivateRoute>
              <TaskCard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
