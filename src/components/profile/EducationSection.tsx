import React from 'react';
import ProfileSection from './ProfileSection';

const EducationSection: React.FC = () => {
    return (
        <ProfileSection title="Education" onAdd={() => { }} onEdit={() => { }}>
            <div className="list-item">
                <div className="item-logo">U</div>
                <div className="item-details">
                    <h3 className="item-title">University of Technology</h3>
                    <p className="item-subtitle">Bachelor of Science - BS, Computer Science</p>
                    <p className="item-meta">2016 - 2020</p>
                </div>
            </div>
        </ProfileSection>
    );
};

export default EducationSection;
