import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import Modal from '../Modal';
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

interface Publication {
    id: string;
    title: string;
    publisher: string;
    date: string;
    url: string;
    description: string;
    logoUrl?: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

function SortableItem({ pub, isOwnProfile, onEdit, isReordering }: { pub: Publication, isOwnProfile: boolean, onEdit: (pub: Publication) => void, isReordering: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: pub.id, disabled: !isReordering });

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
                {pub.logoUrl ? <img src={pub.logoUrl} alt={pub.publisher} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : pub.publisher.charAt(0)}
            </div>
            <div className="item-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className="item-title">{pub.title}</h3>
                    {isOwnProfile && !isReordering && (
                        <button onClick={() => onEdit(pub)} className="edit-icon-btn">
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
    );
}

const PublicationsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isReordering, setIsReordering] = useState(false);

    const fetchPublications = async () => {
        try {
            const response = await fetch('/api/publications');
            if (response.ok) {
                const data = await response.json();
                const mapped = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    publisher: item.publisher,
                    date: item.date,
                    url: item.url,
                    description: item.description,
                    logoUrl: item.logo_url || ''
                }));
                setPublications(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch publications", error);
        }
    };

    React.useEffect(() => {
        fetchPublications();
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
            setPublications((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Save new order (side effect moved out of pure state update if possible, 
                // but here we need newItems. Ideally we use useEffect or just call it here 
                // but we need to ensure it uses the *new* order).
                // Actually, calculating newItems based on 'items' (current state) is correct in the callback.
                // But let's move the fetch out to avoid side-effects in render/setter phase if React retries.
                return newItems;
            });

            // We need the new order to send to API.
            // Since setState is async, we can't get newItems immediately from state.
            // We should calculate it from the *current* publications state variable, 
            // but carefully because 'publications' might be stale in closure?
            // No, 'publications' in the scope of handleDragEnd is from the render.
            // If we assume no other updates are happening, we can recalculate:

            const oldIndex = publications.findIndex((item) => item.id === active.id);
            const newIndex = publications.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(publications, oldIndex, newIndex);
            const ids = newItems.map(item => item.id);

            fetch('/api/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ table: 'publications', items: ids })
            }).catch(err => console.error("Failed to save order", err));
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Publication>({
        id: '',
        title: '',
        publisher: '',
        date: '',
        url: '',
        description: '',
        logoUrl: ''
    });

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            title: '',
            publisher: '',
            date: '',
            url: '',
            description: '',
            logoUrl: ''
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

    const handleDelete = async () => {
        if (!editingId) return;
        try {
            await fetch(`/api/publications/${editingId}`, { method: 'DELETE' });
            setPublications(publications.filter(p => p.id !== editingId));
            setIsModalOpen(false);
            setEditingId(null);
        } catch (error) {
            console.error('Failed to delete publication', error);
        }
    };

    return (
        <ProfileSection
            title="Publications"
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
                    items={publications.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {publications.map(pub => (
                        <SortableItem key={pub.id} pub={pub} isOwnProfile={isOwnProfile} onEdit={handleEdit} isReordering={isReordering} />
                    ))}
                </SortableContext>
            </DndContext>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingId ? 'Edit Publication' : 'Add Publication'}
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
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>Publisher Logo</p>
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
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Publisher</label>
                        <input
                            type="text"
                            value={formData.publisher}
                            onChange={e => setFormData({ ...formData, publisher: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>URL</label>
                        <input
                            type="text"
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
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
            )}
        </ProfileSection>
    );
};

export default PublicationsSection;
