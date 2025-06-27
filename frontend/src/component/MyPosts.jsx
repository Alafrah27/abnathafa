import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"
import PostLiist from "./PostLiist"
import { useState } from "react";
import CommentPost from "./CommentPost";
// import { useNavigate } from "react-router-dom";
import { GetAllPosts, GetMyPosts } from "../services/usePosta";
import { UserInfo } from "../services/useAuth";

// const socialmediapost = [
//     {
//         "id": 1,
//         "title": "ي صباحٍ هادئ، استيقظت المدينة على أنغام الطيور وأشعة الشمس الذهبية...",
//         "avatar": "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
//         "date": "2023-10-01",
//         "name": "ali edris yassin",
//         "images": [
//             "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
//             "https://media.istockphoto.com/id/2188057171/photo/gen-z-male-wearing-t-shirt-and-looking-up-laughing-beauty-and-wellness-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=S51iW8BpRLbsMx242twG30-DqHM2eWF6ON6IWHOzeNo=",

//         ]
//     },
//     {
//         "id": 2,
//         "title": "يوم جديد مليء بالأمل والتفاؤل. لنبدأه بابتسامة ونية صافية.",
//         "avatar": "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
//         "date": "2023-10-02",
//         "name": "mohamed salah",
//         "images": [
//             "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
//             "https://media.istockphoto.com/id/2188057171/photo/gen-z-male-wearing-t-shirt-and-looking-up-laughing-beauty-and-wellness-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=S51iW8BpRLbsMx242twG30-DqHM2eWF6ON6IWHOzeNo=",
//             "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
//             "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500",
//         ]
//     },
//     {
//         "id": 3,
//         "title": "لحظات لا تُنسى مع الأصدقاء في الحديقة.",
//         "avatar": "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
//         "date": "2023-10-03",
//         "name": "sara ali",
//         "images": [
//             "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500",
//             "https://media.istockphoto.com/id/2188057171/photo/gen-z-male-wearing-t-shirt-and-looking-up-laughing-beauty-and-wellness-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=S51iW8BpRLbsMx242twG30-DqHM2eWF6ON6IWHOzeNo=",
//         ]
//     },
//     {
//         "id": 4,
//         "title": "لحظات لا تُنسى مع الأصدقاء في الحديقة.",
//         "avatar": "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww",
//         "date": "2023-10-04",
//         "name": "sara ali",
//         "images": [
//             "https://media.istockphoto.com/id/2188057171/photo/gen-z-male-wearing-t-shirt-and-looking-up-laughing-beauty-and-wellness-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=S51iW8BpRLbsMx242twG30-DqHM2eWF6ON6IWHOzeNo=",
//         ]
//     }
// ]

function MyPosts() {
    const [isopenModal, setIsopenModal] = useState(null); // array of images
    const [currentIndex, setCurrentIndex] = useState(0);
    const [comentScreen, setComentScreen] = useState(false);
    const [selectId, setSelectId] = useState(null);
    // const navigate = useNavigate()
    const { posts, isLoading, error } = GetMyPosts()
    const { User } = UserInfo()



    const handleComent = () => {
        setComentScreen(!comentScreen);
    }
    // index of current image

    const handleOpenModal = (images, index = 0) => {
        setIsopenModal(images);
        setCurrentIndex(index);
    }

    const closemodel = () => {
        setIsopenModal(null);
        setCurrentIndex(0);
    }

    const showPrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => prev > 0 ? prev - 1 : isopenModal.length - 1);
    }

    const showNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => prev < isopenModal.length - 1 ? prev + 1 : 0);
    }



    return (
        <div className="w-full lg:max-w-[800px] mx-auto h-screen flex flex-col ">

            {/* imagelider */}
            {posts?.length > 0 && handleOpenModal && <div className={`${isopenModal ? "opacity-100" : "opacity-0"} bg-black transition-all duration-300 ease-in-out relative`} onClick={closemodel}>
                {isopenModal && (
                    <div className="w-full gap-4 h-full flex items-center overflow-x-auto justify-center fixed top-0 left-0 bg-black z-50" onClick={closemodel}>
                        {isopenModal.length > 1 && <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 outline-none border-none    px-1 py-1 "
                            onClick={showPrev}
                        >
                            <ArrowLeft className="text-blue-600 bg-gray-200 h-10 w-10 rounded-full" size={10} />
                        </button>}
                        <img
                            src={isopenModal[currentIndex]}
                            alt="media"
                            className="scrollbar-hide object-cover h-[500px]  w-full"
                        />
                        {isopenModal.length > 1 && <button
                            className="absolute right-0 top-1/2 -translate-y-1/2  px-1 py-2 outline-none border-none"
                            onClick={showNext}
                        >
                            <ArrowRight className="text-blue-600  bg-gray-200 h-10 w-10 rounded-full" size={10} />
                        </button>}
                    </div>
                )}
            </div>}
            {/* displaycomentStack */}

            {posts?.length > 0 && <div className={` bg-black transition-all duration-300 ease-in-out relative`}>
                {comentScreen && (
                    <div className="w-full gap-4 h-full  overflow-x-auto  fixed top-0 left-0  backdrop-blur z-50">
                        <div className=" scrollbar-hide    w-full h-[80%] flex flex-col overflow-x-scroll absolute bottom-0 rounded-l-lg rounded-r-lg   bg-white ">
                            <button className="text-2xl p-3 fixed top-0 right-0 cursor-pointer outline-none border-none" >
                                <X size={30} className="text-black right-3" onClick={() => setComentScreen(false)} />
                            </button>
                            <h1 className="text-2xl font-bold p-3 text-center border-b border-gray-300 sticky top-0 bg-white">التعليقات</h1>
                            <CommentPost selectId={selectId}
                                posts={posts}
                                isLoading={isLoading} />
                        </div>

                    </div>
                )}
            </div>}


            <div className="w-full flex flex-col ">
                {/* <button className="text-2xl font-bold outline-none border-none  text-end ml-2 cursor-pointer  p-3" onClick={() => {
                    if (!User) {
                        navigate('/login')
                        return
                    } else {

                        navigate('/createpost')
                    }
                }}>
                    <Plus className="w-10 h-10 bg-blue-200 text-blue-600 rounded-full" size={25} />
                </button> */}
                <ul className="mt-6 w-full flex  items-center flex-col gap-4">
                    {error ? (
                        <div>
                            <h1 className="text-2xl font-bold text-center text-red-500">حدث خطأ ما. يرجى المحاولة لاحقاً.</h1>
                        </div>
                    ) : !posts || posts.length === 0 ? (
                        <div>
                            <h1 className="text-2xl font-bold text-center">لا يوجد منشورات</h1>
                        </div>
                    ) : isLoading ? (
                        <div>
                            <h1 className="text-2xl font-bold text-center">جاري التحميل</h1>
                        </div>
                    ) : (
                        posts?.map((post) => (
                            <PostLiist
                                key={post._id}
                                post={post}
                                handleOpenModal={(images) => handleOpenModal(images, 0)}
                                handleComent={handleComent}
                                setSelectId={setSelectId}
                                selectId={selectId}

                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}

export default MyPosts