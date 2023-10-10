import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHome } from '../../components';
import { Modal } from '../../components';  // Make sure this path points to the modal component

const HomePage = () => {
    const { projects, authState, deleteProject } = useHome();
    const [showModal, setShowModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleDeleteClick = (projectId) => {
        setShowModal(true);
        setSelectedProjectId(projectId);
    }

    const handleConfirmDelete = () => {
        deleteProject(selectedProjectId);
        setShowModal(false);
    }

    return (
        <div className="bg-gray-900 h-screen p-4 flex flex-col items-center justify-start space-y-6">
            <h1 className="text-3xl text-white font-bold mb-6">Projects</h1>

            <Modal
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this project?"
            />

            <div className="flex flex-col gap-4 items-center">
                {projects.map((project, index) => (
                    <div key={index} className="w-64 bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center">
                        <Link to={{
                            pathname: `/project/${project.projectId}`,
                            state: { projectDetails: project }
                        }} className="text-white hover:text-blue-500">
                            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                        </Link>

                        {authState.role === 'Admin' &&
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleDeleteClick(project.projectId)}>
                                🗑️
                            </button>}

                    </div>
                ))}
            </div>

            {
                authState.role === 'Admin' &&
                <div className="mt-4">
                    <Link to={`/addproject`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                            Add Project
                        </button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default HomePage;

