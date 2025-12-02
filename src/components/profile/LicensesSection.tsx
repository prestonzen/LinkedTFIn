import React from 'react';
import ProfileSection from './ProfileSection';

interface SectionProps {
    isOwnProfile?: boolean;
}

const LicensesSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    return (
        <ProfileSection title="Licenses & certifications" onAdd={() => { }} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            <div className="list-item">
                <div className="item-logo">L</div>
                <div className="item-details">
                    <h3 className="item-title">Certified Cloud Architect</h3>
                    <p className="item-subtitle">Cloud Provider Inc.</p>
                    <p className="item-meta">Issued Jan 2023 · Expires Jan 2026</p>
                    <p className="item-meta">Credential ID 123456789</p>
                </div>
            </div>
        </ProfileSection>
    );
};

export default LicensesSection;
