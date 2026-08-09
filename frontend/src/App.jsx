import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "./utils/axios";
import { setUser, setAuthChecked } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await API.get("/user/profile");
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setAuthChecked(true));
    }
  };

  checkAuth();
}, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;