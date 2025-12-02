import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, Briefcase, MessageSquare, Bell, User, Search } from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <header className="navbar">
        <div className="container navbar-content">
          <div className="navbar-left">
            <Link to="/" className="logo">
              Linked<span className="logo-highlight">TF</span>In
            </Link>
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          
          <nav className="navbar-right">
            <Link to="/" className="nav-item active">
              <Home size={24} />
              <span>Home</span>
            </Link>
            <Link to="/jobs" className="nav-item">
              <Briefcase size={24} />
              <span>Jobs</span>
            </Link>
            <Link to="/messaging" className="nav-item">
              <MessageSquare size={24} />
              <span>Messaging</span>
            </Link>
            <Link to="/notifications" className="nav-item">
              <Bell size={24} />
              <span>Notifications</span>
            </Link>
            <Link to="/profile" className="nav-item">
              <User size={24} />
              <span>Me</span>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
