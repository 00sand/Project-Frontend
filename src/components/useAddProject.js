import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export const useAddProject = () => {
    const { authState } = useAuth();
    const userId = authState.userId
    const [title, setTitle] = useState('');
    let history = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
            title,
            userId,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                history('/home');
            })
            .catch((error) => {
                console.log(`error is:${error.message}`);
            });
    };

    return {
        title,
        handleTitleChange,
        handleSubmit
    };
}
