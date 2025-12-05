import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import AboutSection from '../components/profile/AboutSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import EducationSection from '../components/profile/EducationSection';
import LicensesSection from '../components/profile/LicensesSection';
import ProjectsSection from '../components/profile/ProjectsSection';
import SkillsSection from '../components/profile/SkillsSection';
import PublicationsSection from '../components/profile/PublicationsSection';
import '../styles/Profile.css';
import { useAuth } from '../context/AuthContext';

interface ProfileProps {
    isOwnProfile?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isOwnProfile = true }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOwnProfile && !isLoggedIn) {
            navigate('/login');
        }
    }, [isOwnProfile, isLoggedIn, navigate]);

    if (isOwnProfile && !isLoggedIn) {
        return null;
    }

    return (
        <div className="container profile-page">
            <div className="profile-main" style={{ width: isOwnProfile ? 'auto' : '100%', maxWidth: isOwnProfile ? 'none' : '800px', margin: isOwnProfile ? '0' : '0 auto' }}>
                <ProfileHeader isOwnProfile={isOwnProfile} />
                <AboutSection isOwnProfile={isOwnProfile} />
                <ExperienceSection isOwnProfile={isOwnProfile} />
                <EducationSection isOwnProfile={isOwnProfile} />
                <LicensesSection isOwnProfile={isOwnProfile} />
                <ProjectsSection isOwnProfile={isOwnProfile} />
                <PublicationsSection isOwnProfile={isOwnProfile} />
                <SkillsSection isOwnProfile={isOwnProfile} />
            </div>

            {isOwnProfile && (
                <aside className="profile-sidebar">
                    <div className="card">
                        <div className="sidebar-item">
                            <h3>Profile language</h3>
                            <p>English</p>
                        </div>
                        <div className="sidebar-divider"></div>
                        <div className="sidebar-item">
                            <h3>Public profile & URL</h3>
                            <p
                                onClick={() => {
                                    navigator.clipboard.writeText('linkedtfin.com/in/prestonzen');
                                    alert('URL copied to clipboard!');
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                linkedtfin.com/in/prestonzen
                            </p>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default Profile;
