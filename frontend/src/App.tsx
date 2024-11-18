import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import Dashboard from "@/features/courses/pages/Dashboard";
import Course from "@/features/courses/pages/Course";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:id" element={<Course />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}
