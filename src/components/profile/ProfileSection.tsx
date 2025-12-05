import React, { type ReactNode } from 'react';
import { Plus, Pencil, Check } from 'lucide-react';
import './ProfileSection.css';

interface ProfileSectionProps {
    title: string;
    children: ReactNode;
    onAdd?: () => void;
    onEdit?: () => void;
    isOwnProfile?: boolean;
    isReordering?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    title,
    children,
    onAdd,
    onEdit,
    isOwnProfile = true,
    isReordering = false
}) => {
    return (
        <div className="card section-card">
            <div className="section-header">
                <h2>{title}</h2>
                {isOwnProfile && (
                    <div className="section-actions">
                        {onAdd && (
                            <button className="icon-btn" onClick={onAdd} aria-label={`Add ${title}`}>
                                <Plus size={24} />
                            </button>
                        )}
                        {onEdit && (
                            <button
                                className={`icon-btn ${isReordering ? 'active' : ''}`}
                                onClick={onEdit}
                                aria-label={isReordering ? "Finish Reordering" : `Edit ${title}`}
                                title={isReordering ? "Finish Reordering" : `Edit ${title}`}
                            >
                                {isReordering ? <Check size={24} /> : <Pencil size={24} />}
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="section-content">
                {children}
            </div>
        </div>
    );
};

export default ProfileSection;
