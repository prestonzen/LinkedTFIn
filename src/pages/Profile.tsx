import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import AboutSection from '../components/profile/AboutSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import EducationSection from '../components/profile/EducationSection';
import LicensesSection from '../components/profile/LicensesSection';
import ProjectsSection from '../components/profile/ProjectsSection';
import SkillsSection from '../components/profile/SkillsSection';
import PublicationsSection from '../components/profile/PublicationsSection';
import '../styles/Profile.css';

interface ProfileProps {
    isOwnProfile?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isOwnProfile = true }) => {
    return (
        <div className="container profile-page">
            <div className="profile-main">
                <ProfileHeader isOwnProfile={isOwnProfile} />
                <AboutSection isOwnProfile={isOwnProfile} />
                <ExperienceSection isOwnProfile={isOwnProfile} />
                <EducationSection isOwnProfile={isOwnProfile} />
                <LicensesSection isOwnProfile={isOwnProfile} />
                <ProjectsSection isOwnProfile={isOwnProfile} />
                <PublicationsSection isOwnProfile={isOwnProfile} />
                <SkillsSection isOwnProfile={isOwnProfile} />
            </div>

            <aside className="profile-sidebar">
                <div className="card">
                    <h3>Profile language</h3>
                    <p>English</p>
                </div>
                <div className="card">
                    <h3>Public profile & URL</h3>
                    <p>www.linkedtfin.com/in/prestonzen</p>
                </div>
            </aside>
        </div>
    );
};

export default Profile;
