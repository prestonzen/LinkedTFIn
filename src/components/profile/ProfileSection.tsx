import React, { type ReactNode } from 'react';
import { Plus, Pencil } from 'lucide-react';
import './ProfileSection.css';

interface ProfileSectionProps {
    title: string;
    children: ReactNode;
    onAdd?: () => void;
    onEdit?: () => void;
    isOwnProfile?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    title,
    children,
    onAdd,
    onEdit,
    isOwnProfile = true
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
                            <button className="icon-btn" onClick={onEdit} aria-label={`Edit ${title}`}>
                                <Pencil size={24} />
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
