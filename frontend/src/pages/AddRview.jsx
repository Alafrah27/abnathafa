import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Navbar from '../component/Navbar';
import { UseAddComment } from '../services/usereview/UseReview';

const ReviewInputComponent = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const { addreview, isPending } = UseAddComment();

    const handleSubmit = () => {
        if (rating > 0 && comment.trim()) {
            addreview({ rating, comment });
            // Reset form
            setRating(0);
            setComment('');
        } else {
            alert('يرجى تقديم تقييم وتعليق');
        }
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const starIndex = index + 1;
            const filled = starIndex <= (hoverRating || rating);

            return (
                <Star
                    key={index}
                    className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${filled
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 hover:text-yellow-300'
                        }`}
                    onClick={() => setRating(starIndex)}
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            );
        });
    };

    return (
        <div className="min-h-screen  w-full flex items-center justify-center " >
            <Navbar />
            <div className=" w-full lg:max-w-md mx-auto  h-full ">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">اترك تقييمك</h2>

                    {/* Rating Stars */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-3">
                            تقييمك
                        </label>
                        <div className="flex justify-center space-x-1">
                            {renderStars()}
                        </div>
                        {rating > 0 && (
                            <p className="text-center text-gray-600 text-sm mt-2">
                                {rating} من 5 نجوم
                            </p>
                        )}
                    </div>

                    {/* Comment Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            تعليقك
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="أخبرنا عن تجربتك..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none font-semibold placeholder:text-gray-400 placeholder:text-sm text-[15px] focus:border-transparent resize-none"
                            rows="4"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0 || !comment.trim() || isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        إرسال التقييم
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewInputComponent;