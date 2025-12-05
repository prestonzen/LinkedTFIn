import React, { type ReactNode } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    onSave: () => void;
    onDelete?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onSave, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-footer" style={{ justifyContent: onDelete ? 'space-between' : 'flex-end', display: 'flex', gap: '12px' }}>
                    {onDelete && (
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this item?')) {
                                    onDelete();
                                }
                            }}
                            className="btn btn-danger"
                            style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none' }}
                        >
                            Delete
                        </button>
                    )}
                    <button onClick={onSave} className="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
