import React from 'react';
import { Pencil, Camera } from 'lucide-react';
import { useState } from 'react';
import Modal from '../Modal';
import './ProfileHeader.css';

import { fileToBase64 } from '../../utils/imageUtils';

interface ProfileHeaderProps {
    isOwnProfile?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isOwnProfile = true }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        headline: '',
        location: '',
        about: ''
    });

    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        name: data.name || 'Preston Zen',
                        headline: data.headline || 'Software Engineer',
                        location: data.location || 'San Francisco Bay Area',
                        about: data.about || ''
                    });
                    // Note: In a real app, images would be URLs from R2. 
                    // For now, we might still rely on localStorage for heavy images or need a separate upload endpoint.
                    // But let's assume we fetch them if they were part of the profile data (which they are in schema).
                    // However, our current schema stores them as text, which is fine for base64 for small images, but bad for large.
                    // We will keep using localStorage for images TEMPORARILY to avoid hitting D1 limits with huge base64 strings until R2 is set up.
                    setBannerUrl(localStorage.getItem('bannerUrl') || '');
                    setPhotoUrl(localStorage.getItem('photoUrl') || '');
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to save profile", error);
            alert("Failed to save changes");
        }
    };

    return (
        <>
            <div className="card profile-header-card">
                <div className="profile-banner" style={{ backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined }}>
                    {isOwnProfile && (
                        <>
                            <button className="edit-banner-btn" aria-label="Edit background" onClick={handleBannerClick}>
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={bannerInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'banner')}
                            />
                        </>
                    )}
                </div>

                <div className="profile-info-container">
                    <div className="profile-photo-wrapper">
                        <div className="profile-photo">
                            {photoUrl ? (
                                <img src={photoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span className="profile-initials">PZ</span>
                            )}
                        </div>
                        {isOwnProfile && (
                            <>
                                <button className="edit-photo-btn" aria-label="Edit photo" onClick={handlePhotoClick}>
                                    <Camera size={18} />
                                </button>
                                <input
                                    type="file"
                                    ref={photoInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'photo')}
                                />
                            </>
                        )}
                    </div>

                    <div className="profile-actions">
                        {isOwnProfile ? (
                            <button
                                className="edit-profile-btn"
                                aria-label="Edit profile"
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                <Pencil size={24} />
                            </button>
                        ) : (
                            <div className="public-actions">
                                <button className="btn btn-primary">Connect</button>
                                <button className="btn btn-outline">Message</button>
                            </div>
                        )}
                    </div>

                    <div className="profile-details">
                        <div className="profile-main-info">
                            <h1 className="profile-name">
                                {profileData.name}
                                <span className="verification-badge" title="Verified Member"></span>
                            </h1>
                            <p className="profile-headline">{profileData.headline}</p>
                        </div>

                        <div className="profile-secondary-info">
                            <p className="profile-location">{profileData.location}</p>
                            <a href="#" className="contact-info-link">Contact info</a>
                        </div>

                        <div className="profile-connections">
                            <a href="#" className="connections-link">
                                <span className="connections-count">500+</span> connections
                            </a>
                        </div>

                        {isOwnProfile && (
                            <div className="profile-buttons">
                                <button className="btn btn-primary" onClick={() => window.open('https://www.linkedin.com', '_blank')}>Open to</button>
                                <button className="btn btn-outline" onClick={() => window.open('https://www.linkedin.com', '_blank')}>Add profile section</button>
                                <button className="btn btn-outline" onClick={() => window.open('https://www.linkedin.com', '_blank')}>More</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit intro"
                onSave={handleSave}
            >
                <div className="form-group">
                    <label htmlFor="name" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="headline" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Headline</label>
                    <input
                        type="text"
                        id="headline"
                        value={profileData.headline}
                        onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Location</label>
                    <input
                        type="text"
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ProfileHeader;
