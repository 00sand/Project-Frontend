import React from 'react';
import { useAddProject } from '../../components'; // Import our custom hook

const AddProjectPage = () => {
    const { title, handleTitleChange, handleSubmit } = useAddProject();

    return (
        <div className="bg-gray-900 h-screen flex flex-col justify-start pt-8 items-center">
            <h1 className="text-3xl text-white font-bold mb-6">Add New Project</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg shadow-md w-96"
            >
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-sm font-bold mb-2 text-white"
                    >
                        Project Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 dark:text-white dark:bg-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProjectPage;

