import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useHome = () => {
    const [projects, setProjects] = useState([]);
    const { authState } = useAuth();
    const username = authState.username;

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const updatedProjects = projects.filter(proj => proj.projectId !== projectId);
            setProjects(updatedProjects);

        } catch (error) {
            if (error.response) {
                console.log('Response Error: ', error.response.data);
            } else if (error.request) {
                console.log('Request Error: ', error.request);
            } else {
                console.log('Error: ', error.message);
            }
        }
    }


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log('Response Error: ', error.response.data);
                } else if (error.request) {
                    console.log('Request Error: ', error.request);
                } else {
                    console.log('Error: ', error.message);
                }
            });
    }, []);

    return {
        projects,
        authState,
        username,
        deleteProject
    };
}

