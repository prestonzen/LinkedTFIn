import React from 'react';
import ProfileSection from './ProfileSection';

const PublicationsSection: React.FC = () => {
    return (
        <ProfileSection title="Publications" onAdd={() => { }} onEdit={() => { }}>
            <div className="list-item">
                <div className="item-details">
                    <h3 className="item-title">Modern Web Development with React</h3>
                    <p className="item-subtitle">Tech Blog Daily</p>
                    <p className="item-meta">Published Mar 15, 2024</p>
                    <p className="item-description">
                        An in-depth guide to building scalable web applications using the latest React features and patterns.
                    </p>
                    <a href="#" className="contact-info-link" style={{ marginTop: '8px', display: 'inline-block' }}>Show publication</a>
                </div>
            </div>
        </ProfileSection>
    );
};

export default PublicationsSection;
