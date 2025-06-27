import { useState } from "react"
import { Link } from "react-router-dom"
import { UseRegister } from "../services/useAuth";
import { toast } from "react-toastify";


function SiginUP() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [familyname, setFamilyname] = useState("");
    const [lastname, setLastname] = useState("");
    const [policy, setpolicy] = useState(false);


    const { Register, isPending } = UseRegister()

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            lastname: lastname,
            familyname: familyname,
            email: email,
            password: password,
            policy: policy,
        }

        console.log(data);

        if (!policy) {
            return toast.error("يجب الموافقة على الشروط والاحكام")
        } else {

            Register(data)
        }




    }

    return (
        <div className="bg-white w-full h-screen flex justify-center items-center ">
            <div className="max-w-3xl w-full mx-auto  ">
                <form onSubmit={handleRegister} className="w-full flex flex-col gap-4 p-5 lg:p-12 rounded-2xl">
                    <h1 className="text-3xl font-bold text-center mb-4"> تسجيل الدخول</h1>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-1 font-bold " >اسم المستخدم</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" placeholder="اسم المستخدم" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-1 font-bold " >
                            اسم الثانى
                        </label>
                        <input
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            type="text" placeholder="اسم الثاني" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-1 font-bold " >
                            اسم العائلة
                        </label>
                        <input
                            value={familyname}
                            onChange={(e) => setFamilyname(e.target.value)}
                            type="text" placeholder="اسم العائلة" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-1 font-bold " >
                            بريد الكترونى
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" placeholder="بريد الكترونى" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg mb-1 font-bold " >
                            كلمة المرور
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="كلمة المرور" className="w-full text-[15px] font-semibold bg-transparent border-2 ring-1 ring-slate-400 placeholder:text-gray-400 placeholder:font-bold placeholder:text-sm border-slate-400 py-4 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ease-in-out" />
                    </div>
                    <div className="flex   gap-2">
                        <input
                            value={policy}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setpolicy(true)

                                } else {
                                    setpolicy(false)
                                }
                            }}
                            type="checkbox" className=" w-5 h-5 border-2 cursor-pointer border-slate-400 checked:bg-blue-500 focus:outline-none  rounded-lg  " />
                        <Link to="/policy" className="text-sm mb-4 font-bold text-blue-600  " >
                            اوافق  علي الشروط و الاحكام
                        </Link>
                    </div>
                    <button
                        disabled={!policy || isPending}
                        className="outline-none border-none mt-5 py-2 px-4 disabled:opacity-50 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                        تسجيل الدخول
                    </button>

                    <p className="text-center mt-4 text-sm flex gap-3 items-center font-extrabold ">
                        لديك حساب؟
                        <Link to="/login" className="text-blue-600"> سجل الان</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SiginUP
