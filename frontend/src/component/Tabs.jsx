import { ArrowBigLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

function Tabs({ isactive, setIsActive }) {
    const [isscroll, setIsScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScroll(true);
        } else {
            setIsScroll(false);
        }
    };

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const tabs = [
        { id: 1, content: "المنشورات" },
        { id: 2, content: 'التحويلات' },
        { id: 4, content: 'المناسبات' },
        { id: 3, content: 'الملف الشخصي' },
    ];

    // Map each tab content to a border color class
    const borderColors = {
        "المنشورات": 'border-secondary-300',  // You can replace with actual classes
        'التحويلات': 'border-primary-500',
        'المناسبات': 'border-primary-500',
        'الملف الشخصي': 'border-gray-300'
    };

    // Determine the current border color class based on active tab
    const currentBorderColor = borderColors[isactive] || 'border-gray-200';

    return (
        <div className="container mx-auto p-4 max-h-screen">
            {/* Optional navigation button at the top right */}
            <div className={`hidden lg:flex justify-end mb-2 p-2 transition-all duration-300 ${isscroll ? 'fixed top-0 right-4 z-20 bg-white rounded-full shadow-lg' : 'relative'
                }`}>
                <button
                    className="hidden text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => {
                        // Add your back navigation logic here
                        console.log('Back button clicked');
                    }}
                >
                    <ArrowRight />
                </button>
            </div>

            {/* Tab buttons container */}
            <div
                className={`flex justify-between w-full lg:max-w-4xl mx-auto gap-2 items-center p-2  px-3 fixed top-0 left-0 right-0
        space-x-4 mb-4 border-b ${currentBorderColor} z-10 rounded-lg transition-all duration-300 ${isscroll ? 'bg-white shadow-lg' : 'bg-transparent'}`}

            >

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-3 py-3 no-wrap text-sm font-medium transition-colors duration-300 outline-none border-none rounded-lg ${isactive === tab.content
                            ? 'text-blue-500 border-b-2 border-blue-500'
                            : 'text-gray-700'
                            }`}
                        onClick={() => setIsActive(tab.content)}
                    >
                        {tab.content}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tabs;
