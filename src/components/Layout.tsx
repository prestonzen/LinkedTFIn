import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, Briefcase, MessageSquare, Bell, User, Search } from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
  const [isMeDropdownOpen, setIsMeDropdownOpen] = React.useState(false);
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
            <div className="nav-item-wrapper" style={{ position: 'relative' }}>
              <button
                className="nav-item"
                onClick={() => setIsMeDropdownOpen(!isMeDropdownOpen)}
                onBlur={() => setTimeout(() => setIsMeDropdownOpen(false), 200)}
              >
                <User size={24} />
                <span>Me</span>
              </button>
              {isMeDropdownOpen && (
                <div className="me-dropdown">
                  <div className="me-dropdown-header">
                    <div className="me-dropdown-user">
                      <div className="me-avatar">PZ</div>
                      <div className="me-info">
                        <div className="me-name">Preston Zen</div>
                        <div className="me-headline">Software Engineer</div>
                      </div>
                    </div>
                    <Link to="/profile" className="btn btn-outline btn-sm btn-block">View Profile</Link>
                  </div>
                  <div className="me-dropdown-items">
                    <div className="dropdown-section">
                      <h3>Account</h3>
                      <a href="#">Settings & Privacy</a>
                      <a href="#">Help</a>
                      <a href="#">Language</a>
                    </div>
                    <div className="dropdown-section">
                      <h3>Manage</h3>
                      <a href="#">Posts & Activity</a>
                      <a href="#">Job Posting Account</a>
                    </div>
                    <div className="dropdown-section">
                      <Link to="/" onClick={() => {
                        setIsMeDropdownOpen(false);
                        // In a real app, we would clear auth tokens here
                        window.location.href = '/';
                      }}>Sign Out</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
