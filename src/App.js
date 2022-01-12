import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//components

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

//styles
import "./App.css";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {user && <Dashboard />}
                    {!user && <Navigate to="/login" />}
                  </>
                }
              />
              <Route
                path="/create"
                element={
                  <>
                    {user && <Create />}
                    {!user && <Navigate to="/login" />}
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    {user && <Project />}
                    {!user && <Navigate to="/login" />}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {!user && <Login />}
                    {user && <Navigate to="/" />}
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    {!user && <Signup />}
                    {user && <Navigate to="/" />}
                  </>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
