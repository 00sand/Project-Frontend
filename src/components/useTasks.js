import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export const useTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [showModal, setShowModal] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                setTask(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching task:', error);
            });
    }, []);

    const deleteTask = () => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                history(-1); // Navigate back after successful delete
            })
            .catch(error => {
                console.error('Error deleting the task:', error);
            });
    }

    const editTask = (updatedTaskData) => {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, updatedTaskData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                history(-1); // Navigate back after successful update
            })
            .catch(error => {
                console.error('Error updating the task:', error);
            });
    }

    return {
        task,
        showModal,
        setShowModal,
        deleteTask,
        editTask
    };
}

