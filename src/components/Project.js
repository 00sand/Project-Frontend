import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import DND_StatusColumn from './DND_StatusColumn';

const STATUS_MAPPINGS = {
    'Assigned': 1,
    'In Progress': 2,
    'Completed': 3
};

export const Project = () => {
    const location = useLocation();
    const [projectDetails, setProjectDetails] = useState(location.state?.projectDetails);

    const initialStatusData = {
        'Assigned': { name: 'Assigned', items: [] },
        'In Progress': { name: 'In Progress', items: [] },
        'Completed': { name: 'Completed', items: [] },
    };

    const { id } = useParams();
    const [statusData, setStatusData] = useState(initialStatusData);


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                setProjectDetails(response.data);
                console.log('API Response:', response.data); // Check the data received from the API

                const tasksByStatus = response.data.tasks.reduce((acc, task) => {
                    const statusCategory = task.statusCategory.statusName;
                    if (!acc[statusCategory]) {
                        acc[statusCategory] = { name: statusCategory, items: [] };
                    }
                    acc[statusCategory].items.push(task);
                    return acc;
                }, { ...initialStatusData });

                console.log('Processed Data:', tasksByStatus); // Check the data after processing
                setStatusData(tasksByStatus);

                // Adding this log to check the current statusData state after updating it
                console.log('Assigned Tasks:', tasksByStatus['Assigned'].items);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, []);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            // Move item to a different droppable
            const sourceItems = Array.from(statusData[source.droppableId].items);
            const [movedItem] = sourceItems.splice(source.index, 1);
            const destinationItems = Array.from(statusData[destination.droppableId].items);
            destinationItems.splice(destination.index, 0, movedItem);

            setStatusData({
                ...statusData,
                [source.droppableId]: {
                    ...statusData[source.droppableId],
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...statusData[destination.droppableId],
                    items: destinationItems,
                },
            });

            // Update the status of the moved task in the backend
            const taskId = movedItem.taskId;
            const newStatusCategoryId = STATUS_MAPPINGS;
            axios.put(`${process.env.REACT_APP_API_BASE_URL}/tasks/${taskId}/status/${STATUS_MAPPINGS[destination.droppableId]}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    console.log('Status updated:', response.data);
                })
                .catch(error => console.error(error));
        }
    };

    if (!projectDetails) {
        return <div>Loading...</div>;
    }

    console.log(projectDetails.title)

    return (
        <div className="bg-gray-900 flex items-start justify-center h-screen p-4 overflow-x-auto">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
                <h2 className="text-white font-bold text-xl">{`Project: ${projectDetails.title}`}</h2>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-4">
                    {Object.entries(statusData).map(([status, data]) => (
                        <DND_StatusColumn status={status} data={data} key={status} />
                    ))}
                </div>
                <Link to={`/addtask/${id}`}>
                    <div className='pl-6'>
                        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-3 rounded-md">
                            Add Task
                        </button>
                    </div>
                </Link>
            </DragDropContext>
        </div>
    );
};


