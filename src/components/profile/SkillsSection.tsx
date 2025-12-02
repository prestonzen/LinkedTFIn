import React from 'react';
import ProfileSection from './ProfileSection';

interface SectionProps {
    isOwnProfile?: boolean;
}

const SkillsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    return (
        <ProfileSection title="Skills" onAdd={() => { }} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            <div className="list-item">
                <div className="item-details">
                    <h3 className="item-title">React.js</h3>
                    <p className="item-meta">Endorsed by 5 colleagues</p>
                </div>
            </div>
            <div className="list-item">
                <div className="item-details">
                    <h3 className="item-title">TypeScript</h3>
                    <p className="item-meta">Passed Skill Assessment</p>
                </div>
            </div>
            <div className="list-item">
                <div className="item-details">
                    <h3 className="item-title">Cloudflare Workers</h3>
                </div>
            </div>
        </ProfileSection>
    );
};

export default SkillsSection;
