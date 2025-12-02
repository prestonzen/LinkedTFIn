import React from 'react';
import ProfileSection from './ProfileSection';

const ProjectsSection: React.FC = () => {
    return (
        <ProfileSection title="Projects" onAdd={() => { }} onEdit={() => { }}>
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
