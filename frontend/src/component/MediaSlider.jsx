import { useState, useEffect } from 'react';

function MediaSlider({ media, initialSlide = 0, onClose }) {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const [isPlaying, setIsPlaying] = useState(false);

    const totalSlides = media.length;

    useEffect(() => {
        // Add keyboard event listeners
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') navigateSlide('prev');
            if (e.key === 'ArrowRight') navigateSlide('next');
        };

        window.addEventListener('keydown', handleKeyDown);

        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [currentSlide, onClose]);

    const navigateSlide = (direction) => {
        if (direction === 'next') {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        } else {
            setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
        }
        setIsPlaying(false);
    };

    const currentMedia = media[currentSlide];

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center animate-fade-in">
            {/* Close button */}
            <button
                className="absolute top-4 right-4 text-white p-2 z-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
                onClick={onClose}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Media container */}
            <div className="relative w-full h-full flex items-center justify-center">
                {currentMedia.type === 'image' ? (
                    <img
                        src={currentMedia.url}
                        alt="Post media"
                        className="max-w-full max-h-[80vh] object-contain animate-slide-up"
                    />
                ) : (
                    <video
                        src={currentMedia.url}
                        className="max-w-full max-h-[80vh] animate-slide-up"
                        controls
                        autoPlay={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                )}
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
                <button
                    className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
                    onClick={() => navigateSlide('prev')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
                    onClick={() => navigateSlide('next')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Pagination indicators */}
            {totalSlides > 1 && (
                <div className="absolute bottom-8 inset-x-0">
                    <div className="flex justify-center space-x-2">
                        {media.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-4' : 'bg-gray-500'
                                    }`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Media counter */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                {currentSlide + 1} / {totalSlides}
            </div>
        </div>
    );
}

export default MediaSlider;