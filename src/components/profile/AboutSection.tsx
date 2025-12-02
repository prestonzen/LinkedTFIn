import React from 'react';
import ProfileSection from './ProfileSection';

const AboutSection: React.FC = () => {
    return (
        <ProfileSection title="About" onEdit={() => { }}>
            <p className="item-description">
                I am a dedicated software engineer with a passion for building scalable web applications.
                I specialize in React, TypeScript, and Cloudflare technologies.
                Always learning and looking for new challenges.
            </p>
        </ProfileSection>
    );
};

export default AboutSection;
