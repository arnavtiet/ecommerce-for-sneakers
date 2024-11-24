import "./index.css";

import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Private from "./routes/Private";
import Admin from "./routes/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}

        <Route path="/Dashboard" element={<Private />}>
          <Route path="" element={<Dashboard />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Orders" element={<Cart />} />
          {/* <Route path="Profile" element={<Profile />} /> */}
        </Route>
        <Route path="/Dashboard" element={<Admin />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
