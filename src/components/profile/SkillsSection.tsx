import React, { useState } from 'react';
import ProfileSection from './ProfileSection';

interface Skill {
    id: string;
    name: string;
    endorsements: number;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

const SkillsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [skills, setSkills] = useState<Skill[]>([]);

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/skills');
            if (response.ok) {
                const data = await response.json();
                setSkills(data);
            }
        } catch (error) {
            console.error("Failed to fetch skills", error);
        }
    };

    React.useEffect(() => {
        fetchSkills();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSkill, setNewSkill] = useState('');

    const handleAdd = () => {
        setNewSkill('');
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (newSkill.trim()) {
            try {
                await fetch('/api/skills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newSkill, endorsements: 0 })
                });
                fetchSkills();
                setIsModalOpen(false);
            } catch (error) {
                console.error("Failed to save skill", error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this skill?")) {
            try {
                await fetch(`/api/skills/${id}`, {
                    method: 'DELETE'
                });
                fetchSkills();
            } catch (error) {
                console.error("Failed to delete skill", error);
            }
        }
    };

    return (
        <ProfileSection title="Skills" onAdd={handleAdd} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            {skills.map(skill => (
                <div key={skill.id} className="list-item">
                    <div className="item-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="item-title">{skill.name}</h3>
                            {isOwnProfile && (
                                <button onClick={() => handleDelete(skill.id)} className="edit-icon-btn" style={{ color: '#666' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            )}
                        </div>
                        <p className="item-meta">Endorsed by {skill.endorsements} colleagues</p>
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add Skill</h2>
                        <div className="form-group">
                            <label>Skill Name</label>
                            <input
                                type="text"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
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

export default SkillsSection;
