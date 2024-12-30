import React from "react";

const Contact = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-lg font-semibold text-orange-500">Contact Us</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          <strong>Email:</strong> support@companionconnect.com
        </p>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          <strong>Address:</strong> 123 Pet Lane, Petville, PA 12345
        </p>
        <button
          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Contact;
