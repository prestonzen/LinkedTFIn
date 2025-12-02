import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

import Login from './pages/Login';
import Register from './pages/Register';
import PublicProfile from './pages/PublicProfile';

import Profile from './pages/Profile';

// Placeholder pages
const Home = () => <div className="container">Home Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="in/:username" element={<PublicProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
