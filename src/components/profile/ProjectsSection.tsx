import React, { useState } from 'react';
import ProfileSection from './ProfileSection';

interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    url: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

const ProjectsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                const mapped = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    startDate: item.start_date,
                    endDate: item.end_date,
                    url: item.url
                }));
                setProjects(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
    };

    React.useEffect(() => {
        fetchProjects();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Project>({
        id: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        url: ''
    });

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            url: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (proj: Project) => {
        setEditingId(proj.id);
        setFormData(proj);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await fetch(`/api/projects/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            fetchProjects();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save project", error);
            alert("Failed to save");
        }
    };

    return (
        <ProfileSection title="Projects" onAdd={handleAdd} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            {projects.map(project => (
                <div key={project.id} className="list-item">
                    <div className="item-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 className="item-title">{project.name}</h3>
                            {isOwnProfile && (
                                <button onClick={() => handleEdit(project)} className="edit-icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                </button>
                            )}
                        </div>
                        <p className="item-meta">{project.startDate} - {project.endDate}</p>
                        <p className="item-description">{project.description}</p>
                        {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="contact-info-link" style={{ marginTop: '8px', display: 'inline-block' }}>
                                Show project
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingId ? 'Edit Project' : 'Add Project'}</h2>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="text"
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="text"
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Project URL</label>
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

export default ProjectsSection;
