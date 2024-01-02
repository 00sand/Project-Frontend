import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useAddTask = () => {
    const { authState } = useAuth();
    const [priority, setPriority] = useState('normal');
    const [dueDate, setDueDate] = useState('');
    const [projectId, setProjectId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const userId = authState.userId;


    const params = useParams();

    const priorityLevels = {
        'normal': 1,
        'medium': 2,
        'urgent': 3
    };

    useEffect(() => {
        const fetchUsersAndProjects = async () => {
            try {
                const [usersResponse, projectsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                ]);

                setUsers(usersResponse.data);
                setSelectedUser(usersResponse.data[0]);
                setProjectId(params.projectId);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchUsersAndProjects();
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Title: title,
            TaskDetails: description,
            Deadline: dueDate,
            Priority: priorityLevels[priority],
            AssignedUserId: selectedUser?.userId,
            UserId: userId,
            ProjectId: projectId
        };


        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/tasks`, data
                , {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
            .then((response) => {
                navigate(`/project/${projectId}`);

            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log('Error', error.message);
                }
            })
    };


    return {
        priority, setPriority, dueDate, setDueDate, title, setTitle, description, setDescription, users, selectedUser, setSelectedUser, handleSubmit
    };

};

