import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';
import { fileToBase64 } from '../../utils/imageUtils';

interface Experience {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    logoUrl?: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

const ExperienceSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Experience>({
        id: '',
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        logoUrl: ''
    });

    const fetchExperiences = async () => {
        try {
            const response = await fetch('/api/experiences');
            if (response.ok) {
                const data = await response.json();
                const mapped = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    company: item.company,
                    startDate: item.start_date,
                    endDate: item.end_date,
                    location: item.location,
                    description: item.description,
                    logoUrl: ''
                }));
                setExperiences(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch experiences", error);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
            logoUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (exp: Experience) => {
        setEditingId(exp.id);
        setFormData(exp);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await fetch(`/api/experiences/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('/api/experiences', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            fetchExperiences();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save experience", error);
            alert("Failed to save");
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleLogoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                setFormData({ ...formData, logoUrl: base64 });
            } catch (error) {
                console.error("Error converting file to base64", error);
            }
        }
    };

    return (
        <>
            <ProfileSection title="Experience" onAdd={handleAdd} onEdit={() => { }} isOwnProfile={isOwnProfile}>
                {experiences.map(exp => (
                    <div className="list-item" key={exp.id} onClick={() => isOwnProfile && handleEdit(exp)} style={{ cursor: isOwnProfile ? 'pointer' : 'default' }}>
                        <div className="item-logo">
                            {exp.logoUrl ? <img src={exp.logoUrl} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : exp.company.charAt(0)}
                        </div>
                        <div className="item-details">
                            <h3 className="item-title">{exp.title}</h3>
                            <p className="item-subtitle">{exp.company}</p>
                            <p className="item-meta">{exp.startDate} - {exp.endDate} · {exp.location}</p>
                            {exp.description && <p className="item-description">{exp.description}</p>}
                        </div>
                    </div>
                ))}
            </ProfileSection>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit experience" : "Add experience"}
                onSave={handleSave}
            >
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#f3f2ef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            overflow: 'hidden'
                        }}
                        onClick={handleLogoClick}
                    >
                        {formData.logoUrl ? (
                            <img src={formData.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontSize: '24px', color: '#666' }}>+</span>
                        )}
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: '600' }}>Company Logo</p>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Click to upload</p>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Company name</label>
                    <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Start Date</label>
                    <input
                        type="text"
                        id="startDate"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>End Date</label>
                    <input
                        type="text"
                        id="endDate"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Location</label>
                    <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Description</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid var(--color-text-primary)',
                            borderRadius: '4px',
                            resize: 'vertical'
                        }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ExperienceSection;
