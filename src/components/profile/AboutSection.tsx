import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';

interface SectionProps {
    isOwnProfile?: boolean;
}

const AboutSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [aboutText, setAboutText] = useState(() => {
        return localStorage.getItem('aboutText') || "I am a dedicated software engineer with a passion for building scalable web applications. I specialize in React, TypeScript, and Cloudflare technologies. Always learning and looking for new challenges.";
    });

    React.useEffect(() => {
        localStorage.setItem('aboutText', aboutText);
    }, [aboutText]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempText, setTempText] = useState('');

    const handleEdit = () => {
        setTempText(aboutText);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setAboutText(tempText);
        setIsModalOpen(false);
    };

    return (
        <>
            <ProfileSection title="About" onEdit={handleEdit} isOwnProfile={isOwnProfile}>
                <p className="item-description" style={{ whiteSpace: 'pre-wrap' }}>
                    {aboutText}
                </p>
            </ProfileSection>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Edit about"
                onSave={handleSave}
            >
                <div className="form-group">
                    <label htmlFor="about" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</label>
                    <textarea
                        id="about"
                        value={tempText}
                        onChange={(e) => setTempText(e.target.value)}
                        rows={8}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid var(--color-text-primary)',
                            borderRadius: '4px',
                            resize: 'vertical',
                            minHeight: '150px'
                        }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default AboutSection;
