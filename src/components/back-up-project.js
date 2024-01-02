import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export const Project = () => {

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
                console.log('API Response:', response.data); // Check the data received from the API

                const tasksByStatus = response.data.tasks.reduce((acc, task) => {
                    const statusCategory = task.statusCategory.statusName;
                    if (!acc[statusCategory]) {
                        acc[statusCategory] = { name: statusCategory, items: [] };
                    }
                    acc[statusCategory].items.push(task);
                    return acc;
                }, { ...initialStatusData });

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
            const newStatusCategoryId = destination.droppableId === 'Assigned' ? 1 : destination.droppableId === 'In Progress' ? 2 : 3;
            axios.put(`${process.env.REACT_APP_API_BASE_URL}/tasks/${taskId}/status/${newStatusCategoryId}`, {}, {
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



    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(statusData).map(([status, data], index) => (
                    <Droppable droppableId={status} key={status}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ margin: '0 10px', backgroundColor: 'white', width: 250 }}
                            >
                                <h3>{data.name}</h3>
                                {data.items.map((item, index) => (
                                    <Draggable key={`${status}-${index}`} draggableId={`${status}-${index}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Link to={`/task/${item.taskId}`}>
                                                    <p>{item.title}</p>
                                                    <p>{item.taskDetails}</p>
                                                </Link>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </>
    );
};

