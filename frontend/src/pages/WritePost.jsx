import { Image, LoaderCircle } from "lucide-react"
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { UsePost } from "../services/usePosta";
import { UserInfo } from "../services/useAuth";
import { toast } from "react-toastify";

function WritePost() {
    const [images, setImages] = useState([]);
    const [title, settitle] = useState("");
    const navigate = useNavigate()
    const { CreatePost, isPending } = UsePost()
    const { User } = UserInfo();

    const handlepost = (e) => {
        e.preventDefault();
        if (!title.trim() && images.length === 0) {
            toast.error(" يرجى إضافة عنوان أو صورة على الأقل");
            return;
        }

        const formData = new FormData();

        // Append each image file individually
        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append("images", image);
            });
        }

        formData.append("title", title);

        if (!User) {
            navigate('/login');
        } else {

            CreatePost(formData);
        }

    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Limit to 8 images
        if (files.length > 8) {
            alert('Maximum 8 images allowed');
            return;
        }

        setImages(files);
    };

    return (
        <div className="w-full h-screen bg-white lg:bg-transparent lg:max-w-4xl lg:mx-auto">
            <form onSubmit={handlepost} className="py-5 px-3">
                <div className="flex items-center justify-between gap-3 px-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="outline-none border-none py-0 text-end"
                    >
                        {isPending ?
                            <LoaderCircle size={30} className="text-blue-600 animate-spin" /> :
                            <IoSend size={30} className="text-blue-600" />
                        }
                    </button>
                    <h1
                        role="button"
                        className="text-sm font-bold text-black flex items-center"
                        onClick={() => navigate(-1)}
                    >
                        رجوع
                        <IoIosArrowRoundBack size={20} className="text-blue-600" />
                    </h1>
                </div>

                <div className="container mx-auto flex flex-col items-center gap-4 py-0 mt-8">
                    <div className="flex flex-col gap-3 w-full px-3">
                        <label htmlFor="file" className="cursor-pointer">
                            <input
                                type="file"
                                id="file"
                                name="images"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <Image size={30} className="text-gray-300" />
                        </label>

                        {/* Show selected images count */}
                        {images.length > 0 && (
                            <p className="text-sm text-gray-600">
                                {images.length} image(s) selected
                            </p>
                        )}

                        <textarea
                            value={title}
                            rows="10"
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="اكتب منشورك هنا"
                            className="w-full placeholder:text-[13px] space-x-2 placeholder:font-bold underline-none rounded-[20px] break-words text-[14px] font-semibold py-3 px-5 focus:border-none outline-none resize-none bg-transparent h-full"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default WritePost;
