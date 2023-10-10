import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthService } from './services/AuthService';
import { AddProjectPage } from './pages/AddProjectPage';
import { AddTaskPage } from './pages/AddTaskPage';
import { ProjectPage } from './pages/ProjectPage';
import { TaskPage } from './pages/TaskPage';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { Unauthorized } from './pages/UnauthorizedPage';
import { PageNotFound } from './pages/PageNotFound';


const Main = () => {
    const { setAuthInfo, authState } = useAuth();
    const history = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        setAuthInfo({
            username: null,
            role: null,
            userId: null,
            isLoggedIn: false
        });

        history('/login');
    };


    return (
        <>
            <Navbar onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="profile" element={authState.isLoggedIn ? <ProfilePage /> : <Unauthorized />} />
                <Route path="project/:id" element={authState.isLoggedIn ? <ProjectPage /> : <Unauthorized />} />
                <Route path="addproject" element={authState.isLoggedIn ? <AddProjectPage /> : <Unauthorized />} />
                <Route path="task/:id" element={authState.isLoggedIn ? <TaskPage /> : <Unauthorized />} />
                <Route path="addtask/:projectId" element={authState.isLoggedIn ? <AddTaskPage /> : <Unauthorized />} />
                <Route path="home" element={authState.isLoggedIn ? <HomePage /> : <Unauthorized />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );

}

export default Main;
