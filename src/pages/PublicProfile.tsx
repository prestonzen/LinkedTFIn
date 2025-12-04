import React from 'react';
import Profile from './Profile';

const PublicProfile: React.FC = () => {
    return <Profile isOwnProfile={false} />;
};

export default PublicProfile;
