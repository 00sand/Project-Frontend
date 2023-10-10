import React from 'react';
import { useAddTask } from '../../components';

const AddTaskPage = () => {
    const {
        priority, setPriority, dueDate, setDueDate, title, setTitle, description, setDescription, users, selectedUser, setSelectedUser, handleSubmit
    } = useAddTask();

    return (
        <div className="bg-gray-900 flex items-center justify-center h-screen">
            <div className="w-96 p-8 bg-gray-800 rounded-lg">
                <h1 className="text-3xl text-white font-bold mb-6">Add Task</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor="title" className="text-white">Title:</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                    </div>

                    <div>
                        <label htmlFor="description" className="text-white">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3"></textarea>
                    </div>

                    <div>
                        <label htmlFor="priority" className="text-white">Priority:</label>
                        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3">
                            <option value="normal">General</option>
                            <option value="medium">Rush</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="text-white">Due Date:</label>
                        <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-gray-700 text-white rounded-md py-2 px-3" />
                    </div>

                    <div>
                        <label htmlFor="user" className="text-white">User:</label>
                        <select id="user" value={selectedUser?.userId} onChange={(e) => setSelectedUser(users.find(user => user.userId === e.target.value))} className="w-full bg-gray-700 text-white rounded-md py-2 px-3">
                            {users && users.map((user) => (
                                <option key={user.userId} value={user.userId}>
                                    {user.userName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" disabled={selectedUser === null} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );

};

export default AddTaskPage;