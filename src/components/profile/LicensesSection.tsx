import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';
import { Pencil } from 'lucide-react';
import { fileToBase64 } from '../../utils/imageUtils';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface License {
    id: string;
    name: string;
    organization: string;
    issueDate: string;
    expirationDate: string;
    credentialId: string;
    credentialUrl: string;
    logoUrl?: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

function SortableItem({ license, isOwnProfile, onEdit, isReordering }: { license: License, isOwnProfile: boolean, onEdit: (license: License) => void, isReordering: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: license.id, disabled: !isReordering });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isReordering ? 'grab' : 'default',
        touchAction: 'none'
    };

    return (
        <div ref={setNodeRef} style={style} className="list-item">
            {isReordering && (
                <div {...attributes} {...listeners} style={{ marginRight: '12px', cursor: 'grab', display: 'flex', alignItems: 'center', color: '#666' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>
            )}
            <div className="item-logo">
                {license.logoUrl ? <img src={license.logoUrl} alt={license.organization} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : license.organization.charAt(0)}
            </div>
            <div className="item-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className="item-title">{license.name}</h3>
                    {isOwnProfile && !isReordering && (
                        <button onClick={() => onEdit(license)} className="edit-icon-btn">
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
    );
}

const LicensesSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [isReordering, setIsReordering] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<License, 'id'>>({
        name: '',
        organization: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: '',
        logoUrl: ''
    });

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
                    credentialUrl: item.credential_url,
                    logoUrl: item.logo_url || ''
                }));
                setLicenses(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch licenses", error);
        }
    };

    useEffect(() => {
        fetchLicenses();
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setLicenses((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                return newItems;
            });

            // Calculate new order from current state for API call
            const oldIndex = licenses.findIndex((item) => item.id === active.id);
            const newIndex = licenses.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(licenses, oldIndex, newIndex);
            const ids = newItems.map(item => item.id);

            fetch('/api/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ table: 'certifications', items: ids })
            }).catch(err => console.error("Failed to save order", err));
        }
    };

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            name: '',
            organization: '',
            issueDate: '',
            expirationDate: '',
            credentialId: '',
            credentialUrl: '',
            logoUrl: ''
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
            credentialUrl: license.credentialUrl || '',
            logoUrl: license.logoUrl || ''
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            const url = editingId ? `/api/certifications/${editingId}` : '/api/certifications';
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

    const handleDelete = async () => {
        if (!editingId) return;
        try {
            await fetch(`/api/certifications/${editingId}`, { method: 'DELETE' });
            setLicenses(licenses.filter(l => l.id !== editingId));
            setIsModalOpen(false);
            setEditingId(null);
        } catch (error) {
            console.error('Failed to delete certification', error);
        }
    };

    return (
        <ProfileSection
            title="Licenses & certifications"
            onAdd={handleAdd}
            onEdit={() => setIsReordering(!isReordering)}
            isOwnProfile={isOwnProfile}
            isReordering={isReordering}
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={licenses.map(l => l.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {licenses.map(license => (
                        <SortableItem key={license.id} license={license} isOwnProfile={isOwnProfile} onEdit={handleEdit} isReordering={isReordering} />
                    ))}
                </SortableContext>
            </DndContext>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingId ? 'Edit license or certification' : 'Add license or certification'}
                    onSave={handleSave}
                    onDelete={editingId ? handleDelete : undefined}
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
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>Organization Logo</p>
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
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Organization</label>
                        <input
                            type="text"
                            value={formData.organization}
                            onChange={e => setFormData({ ...formData, organization: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Issue Date</label>
                        <input
                            type="date"
                            value={formData.issueDate}
                            onChange={e => setFormData({ ...formData, issueDate: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Expiration Date</label>
                        <input
                            type="date"
                            value={formData.expirationDate}
                            onChange={e => setFormData({ ...formData, expirationDate: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Credential ID</label>
                        <input
                            type="text"
                            value={formData.credentialId}
                            onChange={e => setFormData({ ...formData, credentialId: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Credential URL</label>
                        <input
                            type="text"
                            value={formData.credentialUrl}
                            onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                </Modal>
            )}
        </ProfileSection>
    );
};

export default LicensesSection;
