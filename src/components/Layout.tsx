import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home, Briefcase, MessageSquare, Bell, User, Search } from 'lucide-react';
import './Layout.css';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMeDropdownOpen, setIsMeDropdownOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMeDropdownOpen(false);
    logout();
    navigate('/');
  };

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
            <a href="https://kaizen-university.com/lms/job-openings" className="nav-item" target="_blank" rel="noopener noreferrer">
              <Briefcase size={24} />
              <span>Jobs</span>
            </a>
            <a href="https://discord.gg/Rtm4d3GPdn" className="nav-item" target="_blank" rel="noopener noreferrer">
              <MessageSquare size={24} />
              <span>Messaging</span>
            </a>
            <Link to="/notifications" className="nav-item">
              <Bell size={24} />
              <span>Notifications</span>
            </Link>

            {isLoggedIn ? (
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
                        <a href="/" onClick={handleLogout}>Sign Out</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth-buttons" style={{ display: 'flex', gap: '12px', marginLeft: '12px' }}>
                <Link to="/register" className="btn btn-ghost" style={{ fontWeight: '600' }}>Join now</Link>
                <Link to="/login" className="btn btn-outline" style={{ padding: '6px 24px' }}>Sign in</Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
