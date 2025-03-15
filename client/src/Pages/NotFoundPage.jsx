import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-yellow-600 text-white text-lg rounded-lg hover:bg-yellow-500 transition duration-200 no-underline"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
