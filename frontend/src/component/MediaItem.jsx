import { useState } from 'react';

function MediaItem({ media, onClick }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Handle both string URLs and objects
    const mediaUrl = typeof media === 'string' ? media : media.url;
    const mediaType = typeof media === 'string' ? getMediaType(media) : media.type;

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setError(true);
        setIsLoaded(true); // Stop loading spinner even on error
    };

    return (
        <div
            className="w-full h-60 relative overflow-hidden cursor-pointer bg-gray-100"
            onClick={onClick}
        >
            {mediaType === 'video' ? (
                <video
                    src={mediaUrl}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoadedData={handleLoad}
                    onError={handleError}
                    controls={false}
                    muted
                    playsInline
                    preload="metadata"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (e.target.paused) {
                            e.target.play();
                        } else {
                            e.target.pause();
                        }
                    }}
                />
            ) : (
                <img
                    src={mediaUrl}
                    alt="Post media"
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}

            {!isLoaded && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500 text-sm">Media could not be loaded</p>
                </div>
            )}

            {mediaType === 'video' && isLoaded && !error && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-blue-600 ml-1"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MediaItem;



function getMediaType(url) {
    if (typeof url !== 'string') return 'image';

    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    const lowercaseUrl = url.toLowerCase();

    return videoExtensions.some(ext => lowercaseUrl.includes(ext)) ? 'video' : 'image';
}