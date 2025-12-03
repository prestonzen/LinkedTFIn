import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Camera } from 'lucide-react';
import Modal from '../Modal';
import ImageCropper from '../ImageCropper';
import './ProfileHeader.css';

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

    // Cropping state
    const [croppingImage, setCroppingImage] = useState<string | null>(null);
    const [cropAspect, setCropAspect] = useState(1);
    const [uploadType, setUploadType] = useState<'profile' | 'banner' | null>(null);

    const bannerInputRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handleBannerClick = () => {
        bannerInputRef.current?.click();
    };

    const handlePhotoClick = () => {
        photoInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCroppingImage(reader.result as string);
                setCropAspect(type === 'profile' ? 1 : 4);
                setUploadType(type);
            };
            reader.readAsDataURL(file);
        }
        // Reset input value to allow selecting same file again
        event.target.value = '';
    };

    const handleCropComplete = async (croppedBlob: Blob) => {
        if (!uploadType) return;

        const file = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                if (uploadType === 'profile') {
                    setPhotoUrl(data.url);
                    // Update profile immediately
                    await fetch('/api/profile', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...profileData, photo_url: data.url })
                    });
                } else {
                    setBannerUrl(data.url);
                    // Update profile immediately
                    await fetch('/api/profile', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...profileData, banner_url: data.url })
                    });
                }
            } else {
                console.error("Upload failed");
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file", error);
            alert(`Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setCroppingImage(null);
            setUploadType(null);
        }
    };

    const handleCancelCrop = () => {
        setCroppingImage(null);
        setUploadType(null);
    };

    useEffect(() => {
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
                    setBannerUrl(data.banner_url || '');
                    setPhotoUrl(data.photo_url || '');
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
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
            {croppingImage && (
                <ImageCropper
                    imageSrc={croppingImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCancelCrop}
                    aspect={cropAspect}
                />
            )}
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
                                    onChange={(e) => handleFileChange(e, 'profile')}
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
