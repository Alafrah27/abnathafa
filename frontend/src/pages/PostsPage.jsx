import { useState } from "react";
import Tabs from "../component/Tabs"
import UserProfile from "../component/UserProfile";
import Posts from "../component/Posts";
import MyTransaction from "../component/MyTransaction";
import { UserInfo } from "../services/useAuth";
import AllTransaction from "../component/AllTransaction";

function PostsPage() {
    const [isactive, setIsActive] = useState("المنشورات");
    const { User } = UserInfo()
    return (
        <div className="w-full ">

            <div className="flex flex-col justify-between max-w-7xl mx-auto mb-4 ">

                <Tabs isactive={isactive} setIsActive={setIsActive} />

                {isactive === "المنشورات" && (
                    <div>
                        <Posts />

                    </div>

                )}
                {isactive === "التحويلات" && (
                    <div className="flex flex-col gap-2 p-2 ">
                        <h1 className="text-2xl font-bold mt-14  ">جميع التحويلات</h1>


                        <AllTransaction />
                    </div>
                )}
                {isactive === "المناسبات" && (
                    <div className=" container mx-auto h-screen p-4 flex flex-col gap-2 justify-center items-center">

                        <h1 className="text-2xl font-bold mt-8 mb-2">
                            قريباً سيتم اضافة المناسبات
                        </h1>


                    </div>
                )}
                {User ? isactive === "الملف الشخصي" && (
                    <div className="container mx-auto p-4">
                        <UserProfile />


                    </div>
                ) : <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-xl font-bold mt-8 mb-2">الملف الشخصي</h1>
                    <p className="text-gray-600 text-sm font-semibold">يرجى تسجيل الدخول لعرض ملفك الشخصي.</p>
                    <button className="bg-blue-500  text-sm text-white px-6 py-2 rounded mt-4" onClick={() => window.location.href = '/login'}>
                        تسجيل الدخول
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default PostsPage
