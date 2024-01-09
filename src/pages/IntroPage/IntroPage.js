import React from 'react';
import projectpic from '../../images/people_project.png'

const IntroPage = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen overflow-hidden">
            <div className="flex flex-col justify-between h-full">
                <div className="text-center p-10">
                    <h1 className="text-5xl font-bold mb-6">Manage</h1>
                    <p className="text-xl mb-4">Your Project Management Solution</p>
                </div>

                <div className="px-10 flex-grow">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Feature title="Advanced Security and Data Management" description="Built on C# backend with ASP.NET Identity for secure user authentication. Utilizes JWT tokens for efficient and secure authorization. The system is backed by a SQL database, ensuring safe and structured data management for all user activities." />
                        <Feature
                            title="Dynamic User & Admin Roles"
                            description="Flexible role management allowing users to sign up as either User or Admin. Admins have extensive control to create, manage, and delete projects, assign tasks, and oversee user activities." />
                        <Feature title="Project and Task Management" description="Create projects, add multiple tasks, set deadlines, and track progress. Label tasks by urgency level with color-coding." />
                        <Feature title="Drag & Drop Interface" description="Easily organize tasks with a drag and drop interface. Move tasks through stages: assigned, in progress, and completed." />
                        <Feature title="Full CRUD Operations" description="Complete Create, Read, Update, and Delete capabilities for all your projects and tasks at your fingertips." />
                        <Feature title="Customizable User Profiles" description="Personalize your profile. Manage your account details, track your task assignments, and update your preferences." />
                    </div>
                </div>


            </div>
        </div>
    );
};

const Feature = ({ title, description }) => (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p>{description}</p>
    </div>
);


export default IntroPage;
