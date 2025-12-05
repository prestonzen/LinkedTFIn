import React, { useState, useEffect } from 'react';
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

function SortableItem({ exp, isOwnProfile, onEdit, isReordering }: { exp: Experience, isOwnProfile: boolean, onEdit: (exp: Experience) => void, isReordering: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: exp.id, disabled: !isReordering });

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
                {exp.logoUrl ? <img src={exp.logoUrl} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : exp.company.charAt(0)}
            </div>
            <div className="item-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className="item-title">{exp.title}</h3>
                    {isOwnProfile && !isReordering && (
                        <button onClick={() => onEdit(exp)} className="edit-icon-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                        </button>
                    )}
                </div>
                <p className="item-subtitle">{exp.company}</p>
                <p className="item-meta">{exp.startDate} - {exp.endDate} · {exp.location}</p>
                {exp.description && <p className="item-description">{exp.description}</p>}
            </div>
        </div>
    );
}

const ExperienceSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isReordering, setIsReordering] = useState(false);
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
                    logoUrl: item.logo_url || ''
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
            setExperiences((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                return newItems;
            });

            // Calculate new order from current state for API call
            const oldIndex = experiences.findIndex((item) => item.id === active.id);
            const newIndex = experiences.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(experiences, oldIndex, newIndex);
            const ids = newItems.map(item => item.id);

            fetch('/api/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ table: 'experiences', items: ids })
            }).catch(err => console.error("Failed to save order", err));
        }
    };

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

    const handleDelete = async () => {
        if (!editingId) return;
        try {
            await fetch(`/api/experiences/${editingId}`, { method: 'DELETE' });
            setExperiences(experiences.filter(exp => exp.id !== editingId));
            setIsModalOpen(false);
            setEditingId(null);
        } catch (error) {
            console.error('Failed to delete experience', error);
        }
    };

    return (
        <>
            <ProfileSection
                title="Experience"
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
                        items={experiences.map(e => e.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {experiences.map(exp => (
                            <SortableItem key={exp.id} exp={exp} isOwnProfile={isOwnProfile} onEdit={handleEdit} isReordering={isReordering} />
                        ))}
                    </SortableContext>
                </DndContext>
            </ProfileSection>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit experience" : "Add experience"}
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
