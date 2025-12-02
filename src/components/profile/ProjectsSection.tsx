import React from 'react';
import ProfileSection from './ProfileSection';

interface SectionProps {
    isOwnProfile?: boolean;
}

const ProjectsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    return (
        <ProfileSection title="Projects" onAdd={() => { }} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            <div className="list-item">
                <div className="item-details">
                    <h3 className="item-title">LinkedTFIn Clone</h3>
                    <p className="item-meta">Feb 2025 - Present</p>
                    <p className="item-description">
                        A full-stack clone of LinkedIn built with React, Cloudflare Pages, D1, and R2.
                        Features include authentication, profile editing, and a premium UI design.
                    </p>
                </div>
            </div>
        </ProfileSection>
    );
};

export default ProjectsSection;
