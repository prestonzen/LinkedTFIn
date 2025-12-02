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
    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('profileData');
        return saved ? JSON.parse(saved) : {
            name: 'Preston Zen',
            headline: 'Software Engineer | Full Stack Developer | Building Cool Things',
            location: 'San Francisco Bay Area'
        };
    });

    const [bannerUrl, setBannerUrl] = useState<string>(() => localStorage.getItem('bannerUrl') || '');
    const [photoUrl, setPhotoUrl] = useState<string>(() => localStorage.getItem('photoUrl') || '');

    React.useEffect(() => {
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }, [profileData]);

    React.useEffect(() => {
        if (bannerUrl) localStorage.setItem('bannerUrl', bannerUrl);
    }, [bannerUrl]);

    React.useEffect(() => {
        if (photoUrl) localStorage.setItem('photoUrl', photoUrl);
    }, [photoUrl]);

    const bannerInputRef = React.useRef<HTMLInputElement>(null);
    const photoInputRef = React.useRef<HTMLInputElement>(null);

    const handleBannerClick = () => {
        bannerInputRef.current?.click();
    };

    const handlePhotoClick = () => {
        photoInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'photo') => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                if (type === 'banner') {
                    setBannerUrl(base64);
                } else {
                    setPhotoUrl(base64);
                }
            } catch (error) {
                console.error("Error converting file to base64", error);
            }
        }
    };

    const handleSave = () => {
        // TODO: Save to backend
        setIsEditModalOpen(false);
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
