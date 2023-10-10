import React from 'react';
import '../componentsStyle/Modal.css';

export const Modal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{"Are you sure?"}</p>
                <div className="modal-actions">
                    <button className="confirm-button" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};



