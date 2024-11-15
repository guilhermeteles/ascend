import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NewCourse from './pages/NewCourse';
import Header from './components/Header.tsx';

export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-course" element={<NewCourse />} />
      </Routes>
    </Router>
  );
}
