import React from "react";

function PageNotFound() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold mb-4">Page Not Found</h1>
          <p className="text-gray-600">
            Oops! The page you are looking for does not exist.
          </p>
          <img
            className="mt-4 mx-auto"
            src="https://picsum.photos/300/300"
            alt="sad"
          />
          <button
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
