import React, { useState, useEffect } from 'react';
import { Modal } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../components';
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
    const { task, showModal, setShowModal, deleteTask, editTask } = useTask();
    const { authState } = useAuth();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    let history = useNavigate();

    const priorityLevels = {
        1: 'normal',
        2: 'medium',
        3: 'urgent'
    };

    let taskPriority = priorityLevels[task.priority];

    let colorClass = '';

    if (taskPriority === 'normal') {
        colorClass = 'bg-green-500';
    } else if (taskPriority === 'medium') {
        colorClass = 'bg-yellow-500';
    } else if (taskPriority === 'urgent') {
        colorClass = 'bg-red-500';
    }

    const handleEdit = () => {
        setIsEditMode(true);
        setEditedTask({ ...task });
    };

    const handleSave = () => {
        const updatedData = {
            ...editedTask
        };
        editTask(updatedData); // Update the task
        setIsEditMode(false);
    };

    const handleInputChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    return (
        <>
            {showModal &&
                <Modal
                    isOpen={showModal}
                    onCancel={() => setShowModal(false)}
                    onConfirm={() => { deleteTask(); setShowModal(false); }}
                />
            }
            <div className="bg-gray-900 flex items-center flex-col justify-center" style={{ height: 'calc(100vh - 60px)' }}>
                {isEditMode ? (
                    // Edit mode
                    <form onSubmit={handleSave} className={`w-96 p-8 bg-gray-800 rounded-lg shadow-xl ${colorClass}`}>
                        <div className="space-y-4">

                            <div>
                                <label htmlFor="title" className="text-white">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editedTask.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 text-white rounded-md py-2 px-3"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="text-white">Description:</label>
                                <textarea name="taskDetails" value={editedTask.taskDetails} onChange={handleInputChange} className="w-full bg-gray-700 text-white rounded-md py-2 px-3"></textarea>
                            </div>

                            <div>
                                <label htmlFor="priority" className="text-white">Priority:</label>
                                <select
                                    name="priority"
                                    value={editedTask.priority}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 text-white rounded-md py-2 px-3"
                                >
                                    <option value={1}>General</option>
                                    <option value={2}>Rush</option>
                                    <option value={3}>Urgent</option>
                                </select>
                            </div>


                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">Save</button>
                        </div>
                    </form>
                ) : (
                    // View mode
                    <div style={{ border: '4px solid white' }} className={`w-96 p-8 bg-gray-800 rounded-lg shadow-xl ${colorClass}`}>
                        <h2 className="text-3xl text-white font-bold mb-6">{task.title}</h2>
                        <div className="space-y-4 border-2 p-4 rounded">
                            <p className="text-white">{`Task details: ${task.taskDetails}`}</p>
                            <p className="text-white">{`Priority: ${taskPriority}`}</p>
                            <p className="text-white">{`Assigned to: ${task.userName}`}</p>
                            <p className="text-white">{`Due Date: ${task.deadline}`}</p>
                        </div>
                    </div>
                )}
                <div className="flex space-x-4 pt-7">
                    {!isEditMode && (
                        <>
                            <button onClick={() => history(-1)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back</button>
                            {authState.role === 'Admin' &&
                                (
                                    <>
                                        <button onClick={() => setShowModal(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                                        <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Edit</button>
                                    </>
                                )
                            }

                        </>
                    )}
                    {isEditMode && (
                        <button onClick={() => setIsEditMode(false)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Cancel Edit</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default TaskPage;