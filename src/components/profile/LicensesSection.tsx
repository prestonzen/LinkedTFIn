import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';
import { Pencil } from 'lucide-react';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<License, 'id'>>({
        name: '',
        organization: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: ''
    });

    const fetchLicenses = async () => {
        try {
            const response = await fetch('/api/certifications');
            if (response.ok) {
                const data = await response.json();
                setLicenses(data);
            }
        } catch (error) {
            console.error("Failed to fetch licenses", error);
        }
    };

    useEffect(() => {
        fetchLicenses();
    }, []);

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            name: '',
            organization: '',
            issueDate: '',
            expirationDate: '',
            credentialId: '',
            credentialUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (license: License) => {
        setEditingId(license.id);
        setFormData({
            name: license.name,
            organization: license.organization,
            issueDate: license.issueDate,
            expirationDate: license.expirationDate || '',
            credentialId: license.credentialId || '',
            credentialUrl: license.credentialUrl || ''
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const url = editingId ? `/api/certifications?id=${editingId}` : '/api/certifications';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                fetchLicenses();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to save license", error);
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
                                    <Pencil size={16} />
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
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingId ? 'Edit license or certification' : 'Add license or certification'}
                    onSave={handleSave}
                >
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
                            type="date"
                            value={formData.issueDate}
                            onChange={e => setFormData({ ...formData, issueDate: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiration Date</label>
                        <input
                            type="date"
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
                </Modal>
            )}
        </ProfileSection>
    );
};

export default LicensesSection;
