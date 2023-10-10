import React from 'react';
import { Modal } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../components';
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
    const { task, showModal, setShowModal, deleteTask } = useTask();
    const { authState } = useAuth();
    let history = useNavigate();

    const priorityMapping = {
        1: 'normal',
        2: 'medium',
        3: 'urgent'
    };

    let taskPriority = priorityMapping[task.priority];

    let colorClass = '';

    if (taskPriority === 'normal') {
        colorClass = 'bg-green-500';
    } else if (taskPriority === 'medium') {
        colorClass = 'bg-yellow-500';
    } else if (taskPriority === 'urgent') {
        colorClass = 'bg-red-500';
    }

    return (
        <>
            {showModal &&
                <Modal
                    isOpen={showModal}
                    onCancel={() => setShowModal(false)}
                    onConfirm={() => { deleteTask(); setShowModal(false); }}
                />
            }
            {<div className="bg-gray-900 flex items-center flex-col justify-center" style={{ height: 'calc(100vh - 60px)' }}>
                <div style={{ border: '4px solid white' }} className={`w-96 p-8 bg-gray-800 rounded-lg shadow-xl ${colorClass}`}>
                    <h2 className="text-3xl text-white font-bold mb-6">{task.title}</h2>
                    <div className="space-y-4 border-2 p-4 rounded">
                        <p className="text-white">{`Task details: ${task.taskDetails}`}</p>
                        <p className="text-white">{`Priority: ${taskPriority}`}</p>
                        <p className="text-white">{`Assigned to: ${task.userName}`}</p>
                        <p className="text-white">{`Due Date: ${task.deadline}`}</p>
                    </div>
                </div>
                <div className="flex space-x-4 pt-7">
                    <button onClick={() => history(-1)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back</button>
                    {authState.role === 'Admin' &&
                        <button onClick={() => setShowModal(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                    }
                </div>

            </div>}
        </>
    );
}

export default TaskPage;