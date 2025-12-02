import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicProfile from './pages/PublicProfile';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeWrapper />} />
            <Route path="profile" element={<Profile />} />
            <Route path="in/:username" element={<PublicProfile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const HomeWrapper: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Feed /> : <Home />;
};

export default App;
