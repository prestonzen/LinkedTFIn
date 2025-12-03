import React from 'react';
import '../styles/Notifications.css';

const Notifications: React.FC = () => {
    // Mock view count for now, or random number between 10-50
    const viewCount = Math.floor(Math.random() * 40) + 10;

    return (
        <div className="container notifications-page">
            <div className="card notification-card">
                <div className="notification-header">
                    <h2>Notifications</h2>
                </div>
                <div className="notification-content">
                    <div className="view-count-display">
                        <div className="view-count-number">{viewCount}</div>
                        <div className="view-count-label">profile views in the last 7 days</div>
                    </div>
                    <div className="notification-list">
                        <div className="notification-item">
                            <div className="notification-icon">👀</div>
                            <div className="notification-text">
                                <strong>Someone</strong> viewed your profile.
                                <span className="notification-time">2h ago</span>
                            </div>
                        </div>
                        <div className="notification-item">
                            <div className="notification-icon">👀</div>
                            <div className="notification-text">
                                <strong>A recruiter</strong> from <strong>Tech Corp</strong> viewed your profile.
                                <span className="notification-time">5h ago</span>
                            </div>
                        </div>
                        <div className="notification-item">
                            <div className="notification-icon">👀</div>
                            <div className="notification-text">
                                <strong>Someone</strong> viewed your profile.
                                <span className="notification-time">1d ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
