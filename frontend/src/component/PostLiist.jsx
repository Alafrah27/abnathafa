import { useState } from "react";
import { EllipsisVertical } from "lucide-react"
import MediaItem from "./MediaItem"
import { UseAddLik, UseDeletePost } from "../services/usePosta";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { UserInfo } from "../services/useAuth";

import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "react-share";
import { useLocation } from "react-router-dom";
import Menus from "./Menus";
import { toast } from "react-toastify";
import { formatDate } from "../lib/Date-fns";
function PostLiist({ post, handleOpenModal, handleComent, setSelectId }) {
    const [seeMore, setSeeMore] = useState(true);
    const [share, setShare] = useState(false);
    const [titlecontent, setTitleContent] = useState('')
    const location = useLocation()
    const { AddLike, } = UseAddLik()
    const { User } = UserInfo()
    const { DeletePost } = UseDeletePost()


    // const SeeMoreTitle = post.title.length > 100 ? post.title.slice(0, 100) + "..." : post.titlehan
    const shareUrl = `http://localhost:3000/${location.pathname}`; // Adjust this URL to your actual post URL






    return (
        <li className="flex flex-col gap-1 w-full bg-white shadow-sm rounded-lg  overflow-hidden relative" key={post._id}  >


            <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center gap-3">
                    <picture>

                        <img
                            loading="lazy"
                            fetchPriority="high"
                            decoding="async"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                            src={post?.userId?.avatar || "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"} alt="avatar" className="w-10 h-10 rounded-full object-cover " />
                    </picture>
                    <div>

                        <h2 className="text-sm font-semibold">{post?.userId?.name}</h2>
                        <p className="text-[7px] font-semibold">{formatDate(post?.createdAt)}</p>
                    </div>
                </div>

                <div className="flex-none">

                    <Menus.Menu >
                        <Menus.Toggle id={post?._id} />
                        <Menus.List id={post?._id}>
                            <div className="flex flex-col gap-2 p-4 ml-8 text-sm font-semibold">
                                <button onClick={() => {
                                    navigator.clipboard.writeText(post?.title)
                                    toast.success("تم نسخ الرابط بنجاح")
                                }}>نسخ</button>
                                {post?.userId?._id === User?._id &&
                                    <button onClick={() => DeletePost(post?._id)}>مسح</button>
                                }
                                <button onClick={() => {
                                    navigator.clipboard.writeText(post?.images[0])
                                    toast.success("تم نسخ الرابط بنجاح")
                                }}>حفظ</button>
                            </div>
                        </Menus.List>
                    </Menus.Menu>
                </div>
            </div>


            {post?.title && <p className="text-sm font-semibold text-gray-700 text-justify break-words px-4 pb-4" onClick={() => {
                setTitleContent(post?.title)
                setSeeMore(!seeMore)
            }}
            >
                {seeMore ? post?.title.slice(0, 500) + "..." : titlecontent}
            </p>}

            {post?.images && post?.images?.length > 0 && (
                <div className="w-full h-[500px] aspect-auto relative text-center" onClick={() => handleOpenModal(post.images)}>
                    <picture>

                        <img
                            loading="lazy"
                            fetchPriority="high"
                            decoding="async"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={post?.images[0]} alt="postimage" className="w-full h-full lg:h-[300px] text-center  object-cover" />
                    </picture>
                    {
                        post?.images?.length > 1 && (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center"  >

                                <div className="opacity-70 w-full h-full flex items-center justify-center font-bold text-slate-900 bg-gray-400">
                                    {post?.images?.length}
                                </div>
                            </div>

                        )
                    }
                </div>

            )}

            <div className="p-4 flex justify-between border-t border-gray-100">
                <button
                    onClick={() => {
                        AddLike(post._id)
                    }}

                    className="flex items-center gap-1 text-gray-500 hover:text-blue-500" >
                    {
                        post?.likes?.includes(User?._id) ? (
                            <FaHeart className="text-red-500" size={14} />
                        ) : (
                            <IoMdHeartEmpty size={14} />
                        )
                    }

                    <span className="text-sm">{post?.likes?.length > 0 && post?.likes?.length}إعجاب</span>
                </button>
                <button onClick={() => {
                    handleComent()
                    setSelectId(post._id)
                }
                }
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm">{post?.comments?.length} تعليق</span>
                </button>
                <button
                    onClick={() => setShare(!share)}
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-sm">Share</span>
                </button>
            </div>

            {
                share && (
                    <div className="absolute bottom-20 left-6  bg-white flex items-center justify-center p-4 rounded-lg shadow-lg w-64 z-10">

                        <h2 onClick={() => setShare(false)} role="button" className="text-sm font-bold text-gray-700 absolute top-0 right-2 w-full">x</h2>
                        <div className="flex items-center gap-4 mt-2 ">
                            <FacebookShareButton url={shareUrl} quote={post?.title} hashtag="#ابناء طفع للتواصل الاجتماعي">
                                <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton url={shareUrl} images={[post?.images[0]]} title={post.title}>
                                <  WhatsappIcon size={32} round={true} />
                            </WhatsappShareButton>
                            <TwitterShareButton url={shareUrl} title={post.title} hashtags="#ابناء_طفع_للتواصل_الاجتماعي">
                                <TwitterIcon size={32} round={true} />
                            </TwitterShareButton>
                        </div>

                    </div>
                )
            }

        </li>
    )
}

export default PostLiist
