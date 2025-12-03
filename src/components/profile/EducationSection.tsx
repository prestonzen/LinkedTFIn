import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';
import { fileToBase64 } from '../../utils/imageUtils';

interface Education {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    grade: string;
    activities: string;
    description: string;
    logoUrl?: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

const EducationSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [education, setEducation] = useState<Education[]>([]);

    const fetchEducation = async () => {
        try {
            const response = await fetch('/api/education');
            if (response.ok) {
                const data = await response.json();
                const mapped = data.map((item: any) => ({
                    id: item.id,
                    school: item.school,
                    degree: item.degree,
                    fieldOfStudy: item.field_of_study,
                    startDate: item.start_date,
                    endDate: item.end_date,
                    grade: '', // Not in DB schema yet
                    activities: '', // Not in DB schema yet
                    description: item.description,
                    logoUrl: ''
                }));
                setEducation(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch education", error);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Education>({
        id: '',
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        grade: '',
        activities: '',
        description: '',
        logoUrl: ''
    });

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

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            grade: '',
            activities: '',
            description: '',
            logoUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (edu: Education) => {
        setEditingId(edu.id);
        setFormData(edu);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await fetch(`/api/education/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('/api/education', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            fetchEducation();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save education", error);
            alert("Failed to save");
        }
    };

    return (
        <>
            <ProfileSection title="Education" onAdd={handleAdd} onEdit={() => { }} isOwnProfile={isOwnProfile}>
                {education.map(edu => (
                    <div className="list-item" key={edu.id} onClick={() => isOwnProfile && handleEdit(edu)} style={{ cursor: isOwnProfile ? 'pointer' : 'default' }}>
                        <div className="item-logo">
                            {edu.logoUrl ? <img src={edu.logoUrl} alt={edu.school} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : edu.school.charAt(0)}
                        </div>
                        <div className="item-details">
                            <h3 className="item-title">{edu.school}</h3>
                            <p className="item-subtitle">{edu.degree}, {edu.fieldOfStudy}</p>
                            <p className="item-meta">{edu.startDate} - {edu.endDate}</p>
                            {edu.description && <p className="item-description">{edu.description}</p>}
                        </div>
                    </div>
                ))}
            </ProfileSection>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit education" : "Add education"}
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
                        <p style={{ fontSize: '14px', fontWeight: '600' }}>School Logo</p>
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
                    <label htmlFor="school" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>School</label>
                    <input
                        type="text"
                        id="school"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="degree" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Degree</label>
                    <input
                        type="text"
                        id="degree"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fieldOfStudy" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Field of study</label>
                    <input
                        type="text"
                        id="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        style={{ marginBottom: '16px' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate" style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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

export default EducationSection;
