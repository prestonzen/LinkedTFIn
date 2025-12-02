import React, { useState } from 'react';
import ProfileSection from './ProfileSection';

interface Publication {
    id: string;
    title: string;
    publisher: string;
    date: string;
    url: string;
    description: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

const PublicationsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [publications, setPublications] = useState<Publication[]>([]);

    const fetchPublications = async () => {
        try {
            const response = await fetch('/api/publications');
            if (response.ok) {
                const data = await response.json();
                setPublications(data);
            }
        } catch (error) {
            console.error("Failed to fetch publications", error);
        }
    };

    React.useEffect(() => {
        fetchPublications();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Publication>({
        id: '',
        title: '',
        publisher: '',
        date: '',
        url: '',
        description: ''
    });

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            title: '',
            publisher: '',
            date: '',
            url: '',
            description: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (pub: Publication) => {
        setEditingId(pub.id);
        setFormData(pub);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await fetch(`/api/publications/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('/api/publications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            fetchPublications();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save publication", error);
        }
    };

    return (
        <ProfileSection title="Publications" onAdd={handleAdd} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            {publications.map(pub => (
                <div key={pub.id} className="list-item">
                    <div className="item-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 className="item-title">{pub.title}</h3>
                            {isOwnProfile && (
                                <button onClick={() => handleEdit(pub)} className="edit-icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                </button>
                            )}
                        </div>
                        <p className="item-subtitle">{pub.publisher}</p>
                        <p className="item-meta">Published {pub.date}</p>
                        <p className="item-description">{pub.description}</p>
                        {pub.url && (
                            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="contact-info-link" style={{ marginTop: '8px', display: 'inline-block' }}>
                                Show publication
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingId ? 'Edit Publication' : 'Add Publication'}</h2>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Publisher</label>
                            <input
                                type="text"
                                value={formData.publisher}
                                onChange={e => setFormData({ ...formData, publisher: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>URL</label>
                            <input
                                type="text"
                                value={formData.url}
                                onChange={e => setFormData({ ...formData, url: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </ProfileSection>
    );
};

export default PublicationsSection;
