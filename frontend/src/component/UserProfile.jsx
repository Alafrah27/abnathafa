import { useState } from "react";
import UserTabe from "./UserTabe";
import MyTransaction from "./MyTransaction";
import { Camera, PenBox, PenIcon } from "lucide-react";
import { UserInfo, UserUpdate } from "../services/useAuth";
import MyPosts from "./MyPosts";

function UserProfile() {
    const [istab, setIsTab] = useState("تحويلاتي");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { updateuser } = UserUpdate()
    console.log(avatar);
    const tab = [
        { id: 3, content: 'منشوراتى' },
        { id: 1, content: "تحويلاتي" },
        { id: 2, content: 'الاعدادات' },

    ];
    const { User } = UserInfo()




    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            // Create preview URL for immediate display
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleAvatarUpload = async () => {
        if (!avatar) return;

        setIsUploading(true);

        try {
            // Create FormData and append the actual file
            const formData = new FormData();
            formData.append("avatar", avatar);

            // Call your update function with FormData
            await updateuser(formData);

            // Reset local state after successful upload
            setAvatar(null);
            setAvatarPreview(null);

            // Clean up the preview URL to avoid memory leaks
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }

        } catch (error) {
            console.error('Error uploading avatar:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Determine which image to display
    const getImageSrc = () => {
        if (avatarPreview) return avatarPreview; // Show preview of selected file
        if (User?.avatar) return User.avatar;    // Show current user avatar
        return "pro.png";                        // Show default avatar
    };
    return (
        <div className="max-w-7xl mx-auto h-screen flex flex-col   ">

            <div className="mt-14 flex items-end
            ">


                <div className=" flex items-center justify-center gap-4   ">

                    <div className="relative flex flex-col w-[150px] h-[150px] mx-auto items-center justify-center mb-4 border-4 border-gray-300 rounded-full overflow-hidden">
                        <img
                            src={getImageSrc()}
                            alt="User Avatar"
                            className="w-[200px] h-[200px] object-cover"
                        />

                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"

                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {!avatar ? (
                            <label htmlFor="fileInput">
                                <Camera
                                    className="text-blue-600 font-extrabold cursor-pointer absolute bottom-2 right-2 z-10 bg-white rounded-full p-1"
                                    size={30}
                                />
                            </label>
                        ) : (
                            <div className="absolute bottom-2 right-7 z-10 flex gap-2">
                                {/* Upload button */}
                                <button
                                    onClick={handleAvatarUpload}
                                    disabled={isUploading}
                                    className="bg-green-500 text-white rounded-full p-1 hover:bg-green-600 disabled:opacity-50"
                                >
                                    <PenBox size={20} />
                                </button>

                                {/* Cancel/Change button */}
                                <label htmlFor="fileInput">
                                    <Camera
                                        className="text-blue-600 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100"
                                        size={20}
                                    />
                                </label>
                            </div>
                        )}

                        {isUploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                                <div className="text-white text-sm">Uploading...</div>
                            </div>
                        )}
                    </div>


                    <div className="flex flex-col items-start ">

                        <h1 className="text-xl font-semibold ">{User?.name} {User?.lastname} </h1>
                        <h1 className="text-sm font-bold  "> {User?.familyname} </h1>
                    </div>





                    {/* status */}
                </div>
            </div>
            <div className={`flex items-center gap-4 ${tab.includes(istab) ? "border-b-2 border-blue-500" : "border-b-2 border-gray-300"} p-4 mt-4`}>
                {tab.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-2  no-break text-sm font-semibold rounded-lg ${istab === tab.content ? 'text-blue-500  ' : ' '}`}
                        onClick={() => setIsTab(tab.content)}
                    >
                        {tab.content}
                    </button>
                ))}
            </div>
            {/* <div className=" lg:text-center">
                <h1 className="text-sm font-bold mt-2">الحالة</h1>
                <p className="text-gray-600 text-[14px] text-justify mt-2 lg:text-center">
                    شخص طموح يسعى دائماً للتطوير الذاتي وتحقيق النجاح، أؤمن بقوة العمل الجماعي وأحب مساعدة الآخرين.
                </p>
            </div> */}

            {istab === "منشوراتى" && (
                <div className="mt-0">
                    {/* <h2 className=" font-bold mb-4 text-sm">منشوراتي</h2> */}
                    <MyPosts />
                </div>
            )}


            {istab === "تحويلاتي" && (


                <MyTransaction />

            )}

            {istab === "الاعدادات" && (
                <div className="mt-4">
                    <h2 className=" font-bold mb-4 text-sm">الاعدادات</h2>
                    <p className="text-gray-600 font-bold">سيتم تحديث هذه الصفحة لاحقاً</p>
                </div>
            )}



        </div>
    )
}

export default UserProfile
