import React, { useState, useEffect } from 'react';
import '../styles/Notifications.css';

const NotificationsPopup: React.FC = () => {
    const [viewCount, setViewCount] = useState(0);
    const [timeRange, setTimeRange] = useState('7d');

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const response = await fetch(`/api/notifications/views?range=${timeRange}`);
                if (response.ok) {
                    const data = await response.json();
                    setViewCount(data.count);
                }
            } catch (error) {
                console.error("Failed to fetch views", error);
            }
        };
        fetchViews();
    }, [timeRange]);

    const notifications = [
        {
            id: 1,
            avatar: 'TI',
            text: 'Tech Insider posted: "The future of web development is here!"',
            time: '2h',
            read: false
        },
        {
            id: 2,
            avatar: 'JD',
            text: 'John Doe viewed your profile',
            time: '5h',
            read: true
        },
        {
            id: 3,
            avatar: 'HR',
            text: 'HR Manager at Google viewed your profile',
            time: '1d',
            read: true
        }
    ];

    return (
        <div className="notifications-popup">
            <div className="notifications-popup-header">
                <h3>Notifications</h3>
            </div>
            <div className="notifications-content">
                <div className="notification-stats" style={{ padding: '12px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Profile views</span>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            style={{ fontSize: '12px', padding: '2px 4px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        >
                            <option value="7d">Past 7 days</option>
                            <option value="30d">Past 30 days</option>
                            <option value="90d">Past 90 days</option>
                        </select>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-brand)' }}>
                        {viewCount}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        {timeRange === '7d' ? 'Since last week' : timeRange === '30d' ? 'Since last month' : 'Since last quarter'}
                    </div>
                </div>
                <ul className="notifications-list compact">
                    {notifications.map(notification => (
                        <li key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                            <div className="notification-avatar">{notification.avatar}</div>
                            <div className="notification-details">
                                <p>{notification.text}</p>
                                <span className="notification-time">{notification.time}</span>
                            </div>
                            {!notification.read && <div className="notification-dot"></div>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="notifications-footer" style={{ padding: '8px', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
                <a href="/notifications" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-brand)', textDecoration: 'none' }}>View all notifications</a>
            </div>
        </div>
    );
};

export default NotificationsPopup;
