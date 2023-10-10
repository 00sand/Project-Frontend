import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="w-96 p-8 bg-gray-800 rounded-lg">
        <h1 className="text-3xl text-white font-bold mb-6">Unauthorized</h1>
        <p className="text-xl text-gray-400 mb-6">You must be logged in to view this page.</p>
        <Link to="/login" className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md">Login</Link>
      </div>
    </div>
  );
}

export default Unauthorized;

