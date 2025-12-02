import React, { useState } from 'react';
import ProfileSection from './ProfileSection';

interface License {
    id: string;
    name: string;
    organization: string;
    issueDate: string;
    expirationDate: string;
    credentialId: string;
    credentialUrl: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

const LicensesSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [licenses, setLicenses] = useState<License[]>([]);

    const fetchLicenses = async () => {
        try {
            const response = await fetch('/api/certifications');
            if (response.ok) {
                const data = await response.json();
                const mapped = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    organization: item.organization,
                    issueDate: item.issue_date,
                    expirationDate: item.expiration_date,
                    credentialId: item.credential_id,
                    credentialUrl: item.credential_url
                }));
                setLicenses(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch certifications", error);
        }
    };

    React.useEffect(() => {
        fetchLicenses();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<License>({
        id: '',
        name: '',
        organization: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: ''
    });

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            name: '',
            organization: '',
            issueDate: '',
            expirationDate: '',
            credentialId: '',
            credentialUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (lic: License) => {
        setEditingId(lic.id);
        setFormData(lic);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await fetch(`/api/certifications/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('/api/certifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            fetchLicenses();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save certification", error);
        }
    };

    return (
        <ProfileSection title="Licenses & certifications" onAdd={handleAdd} onEdit={() => { }} isOwnProfile={isOwnProfile}>
            {licenses.map(license => (
                <div key={license.id} className="list-item">
                    <div className="item-logo">{license.organization.charAt(0)}</div>
                    <div className="item-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 className="item-title">{license.name}</h3>
                            {isOwnProfile && (
                                <button onClick={() => handleEdit(license)} className="edit-icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                </button>
                            )}
                        </div>
                        <p className="item-subtitle">{license.organization}</p>
                        <p className="item-meta">Issued {license.issueDate} {license.expirationDate && `· Expires ${license.expirationDate}`}</p>
                        {license.credentialId && <p className="item-meta">Credential ID {license.credentialId}</p>}
                        {license.credentialUrl && (
                            <a href={license.credentialUrl} target="_blank" rel="noopener noreferrer" className="contact-info-link" style={{ marginTop: '8px', display: 'inline-block' }}>
                                Show credential
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingId ? 'Edit License' : 'Add License'}</h2>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Organization</label>
                            <input
                                type="text"
                                value={formData.organization}
                                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Issue Date</label>
                            <input
                                type="text"
                                value={formData.issueDate}
                                onChange={e => setFormData({ ...formData, issueDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiration Date</label>
                            <input
                                type="text"
                                value={formData.expirationDate}
                                onChange={e => setFormData({ ...formData, expirationDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Credential ID</label>
                            <input
                                type="text"
                                value={formData.credentialId}
                                onChange={e => setFormData({ ...formData, credentialId: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Credential URL</label>
                            <input
                                type="text"
                                value={formData.credentialUrl}
                                onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })}
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

export default LicensesSection;
