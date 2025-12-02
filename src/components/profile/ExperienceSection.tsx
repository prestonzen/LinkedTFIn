import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';

interface Experience {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
}

const ExperienceSection: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'Company Name',
            startDate: 'Jan 2023',
            endDate: 'Present',
            location: 'San Francisco, California, United States',
            description: 'Leading the frontend development team...'
        },
        {
            id: '2',
            title: 'Software Engineer',
            company: 'Startup Inc.',
            startDate: 'Jun 2020',
            endDate: 'Dec 2022',
            location: 'Remote',
            description: ''
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Experience>({
        id: '',
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
    });

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            location: '',
            description: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (exp: Experience) => {
        setEditingId(exp.id);
        setFormData(exp);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (editingId) {
            setExperiences(experiences.map(e => e.id === editingId ? { ...formData, id: editingId } : e));
        } else {
            setExperiences([...experiences, { ...formData, id: Date.now().toString() }]);
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <ProfileSection title="Experience" onAdd={handleAdd} onEdit={() => { }}>
                {experiences.map(exp => (
                    <div className="list-item" key={exp.id} onClick={() => handleEdit(exp)} style={{ cursor: 'pointer' }}>
                        <div className="item-logo">{exp.company.charAt(0)}</div>
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
