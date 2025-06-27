import { useState } from "react";
import { UseLogin } from "../services/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isPending } = UseLogin()
    const handlelogin = (e) => {
        e.preventDefault();

        if (!email || !password) return toast.error("كل الحقول مطلوبة")

        login({ email, password });
    }

    return (
        <div className="bg-white w-full h-screen flex justify-center items-center ">
            <div className="max-w-3xl w-full mx-auto  ">
                <form onSubmit={handlelogin} className="bg-gray-50 w-full flex flex-col gap-4 p-6 lg:p-12 rounded-2xl">
                    <h1 className="text-3xl font-bold text-center mb-4"> تسجيل الدخول</h1>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-4 font-bold " >
                            بريد الكترونى
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" placeholder="بريد الكترونى" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-4 font-bold " >
                            كلمة المرور
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="كلمة المرور" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <button
                        disabled={isPending}
                        className="outline-none border-none mt-5 disabled:cursor-not-allowed disabled:bg-gray-400 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                        {isPending ? "جارى التحميل..." : "تسجيل الدخول"}
                    </button>
                    <p className="text-center mt-4 text-sm flex gap-3 items-center font-extrabold ">
                        ليس لديك حساب؟
                        <Link to="/signup" className="text-blue-600"> سجل الان</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
