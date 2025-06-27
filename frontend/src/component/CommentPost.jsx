import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CommentPost({ selectId, posts, isLoading }) {
    console.log("selectId", selectId);
    const [content, setContent] = useState("");
    const getComment = posts?.find((post) => post._id === selectId)?.comments || [];
    console.log("getComment", getComment);

    const queryclient = useQueryClient();

    const { mutate: AddComment, isPending } = useMutation({
        mutationFn: async ({ postId, content }) => {
            // Fix 1: Send content in the correct format expected by backend
            const res = await axiosInstance.post(`/post/${postId}/comment`, {
                content: content
            });
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["posts"]);
            queryclient.invalidateQueries(["post", res.postId]);
            toast.success(res.message);
        },
        onError: (error) => {
            // Fix 2: Better error handling
            console.error("Comment error:", error);
            const errorMessage = error.response?.data?.message || "فشل في إضافة التعليق";
            toast.error(errorMessage);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content || content.trim() === "") {
            toast.warning("يرجى كتابة تعليق قبل الإرسال");
            return;
        }

        // Fix 3: Send content instead of comment
        AddComment({ postId: selectId, content: content });
        setContent("");
    }

    return (
        <div className="flex flex-col gap-3 w-full mt-5 px-1">
            <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
                <button
                    type="submit"
                    disabled={isPending}
                    className="outline-none border-none py-2 px-4 disabled:opacity-50">
                    <IoSend size={30} className="text-blue-600" />
                </button>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="اكتب تعليقك هنا"
                    className="w-full placeholder:text-[13px] placeholder:font-bold bg-gray-100 rounded-[20px] break-words text-[14px] font-semibold py-3 px-5 focus:border-2 focus:border-blue-600 outline-none resize-none h-14"
                    disabled={isPending}
                />
            </form>

            <div className="flex flex-col gap-1 w-full">
                {
                    isLoading ? (
                        <div className="flex items-center justify-center w-full h-20">
                            <span className="text-gray-500">Loading comments...</span>
                        </div>
                    ) : !getComment || getComment.length === 0 ? (
                        <div className="flex items-center justify-center w-full h-20">
                            <span className="text-gray-500">لا يوجد تعليقات</span>
                        </div>
                    ) : getComment && getComment.length > 0 && getComment?.map((comment, index) => (
                        <div key={comment._id || index} className="flex flex-col gap-1 w-full  shadow-sm rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between w-full p-4">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={comment.user?.avatar || "https://images.unsplash.com/photo-1748183346959-dfeec5ade5d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"}
                                        alt="avatar"
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col p-0 m-0">
                                        <h2 className="text-sm font-semibold ">{comment.user?.name}</h2>

                                        <p className="text-sm font-medium text-justify break-words px-0 ">
                                            {comment.comment || comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <p className="text-sm font-medium text-justify break-words px-6 ">
                                {comment.comment || comment.content}
                            </p> */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CommentPost;
