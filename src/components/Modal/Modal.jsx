import React from "react";
import { AiFillStar } from "react-icons/ai";

const Modal = ({ isOpen, onClose, onSubmit, feedback, setFeedback, rating, setRating }) => {
    if (!isOpen) return null;

    const handleRatingChange = (value) => {
        setRating(value);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                <h2 className="text-2xl font-bold mb-4 text-center">Feedback & Rating</h2>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✖
                </button>
                <textarea
                    className="w-full border border-gray-300 rounded-md p-3 resize-none focus:ring focus:ring-blue-300 mb-4"
                    placeholder="Write your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                />

                <div className="mb-6">
                    <p className="font-semibold mb-2">Rate the camp:</p>
                    <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <AiFillStar
                                key={star}
                                className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                                onClick={() => handleRatingChange(star)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
