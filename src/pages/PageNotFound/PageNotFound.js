import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="bg-gray-900 flex items-center justify-center h-screen">
            <div className="w-96 p-8 bg-gray-800 rounded-lg">
                <h1 className="text-3xl text-white font-bold mb-6">Page Not Found</h1>
                <p className="text-xl text-gray-400 mb-6">This page cannot be found.</p>
                <Link to="/home" className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">Home</Link>
            </div>
        </div>
    );
}

export default PageNotFound;
