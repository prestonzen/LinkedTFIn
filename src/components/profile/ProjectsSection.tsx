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

interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    url: string;
    logoUrl?: string;
}

interface SectionProps {
    isOwnProfile?: boolean;
}

function SortableItem({ project, isOwnProfile, onEdit, isReordering }: { project: Project, isOwnProfile: boolean, onEdit: (project: Project) => void, isReordering: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: project.id, disabled: !isReordering });

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
                {project.logoUrl ? <img src={project.logoUrl} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : project.name.charAt(0)}
            </div>
            <div className="item-details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className="item-title">{project.name}</h3>
                    {isOwnProfile && !isReordering && (
                        <button onClick={() => onEdit(project)} className="edit-icon-btn">
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
    );
}

const ProjectsSection: React.FC<SectionProps> = ({ isOwnProfile = true }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isReordering, setIsReordering] = useState(false);

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
                    url: item.url,
                    logoUrl: item.logo_url || ''
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
            setProjects((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                return newItems;
            });

            // Calculate new order from current state for API call
            const oldIndex = projects.findIndex((item) => item.id === active.id);
            const newIndex = projects.findIndex((item) => item.id === over.id);
            const newItems = arrayMove(projects, oldIndex, newIndex);
            const ids = newItems.map(item => item.id);

            fetch('/api/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ table: 'projects', items: ids })
            }).catch(err => console.error("Failed to save order", err));
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Project>({
        id: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        url: '',
        logoUrl: ''
    });

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            id: '',
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            url: '',
            logoUrl: ''
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
            await fetch(`/api/projects/${editingId}`, { method: 'DELETE' });
            setProjects(projects.filter(p => p.id !== editingId));
            setIsModalOpen(false);
            setEditingId(null);
        } catch (error) {
            console.error('Failed to delete project', error);
        }
    };

    return (
        <ProfileSection
            title="Projects"
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
                    items={projects.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {projects.map(project => (
                        <SortableItem key={project.id} project={project} isOwnProfile={isOwnProfile} onEdit={handleEdit} isReordering={isReordering} />
                    ))}
                </SortableContext>
            </DndContext>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingId ? 'Edit Project' : 'Add Project'}
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
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>Project Logo</p>
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
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Project Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>End Date</label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ position: 'static', marginBottom: '4px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>Project URL</label>
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

export default ProjectsSection;
