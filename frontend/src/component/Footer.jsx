import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"

function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white py-5 mt-8  ">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-right h-[200px]">
                <div className="mb-4 md:mb-0 w-full md:w-auto">
                    <p className="text-sm text-gray-400">
                        © ٢٠٢٤ جميع الحقوق محفوظة. رابطة ابناء طفع
                    </p>
                    <p className="text-xs mt-2 text-gray-400">
                        تابعنا على وسائل التواصل الاجتماعي:
                    </p>
                    <div className="flex justify-center items-center md:justify-end gap-3 mt-3">
                        <a className="hover:text-blue-400 transition text-sm">
                            <FaFacebook size={20} />
                        </a>
                        <a className="hover:text-blue-300 transition text-sm">
                            <FaTwitter />
                        </a>
                        <a className="hover:text-pink-400 transition text-sm">
                            <FaInstagram size={20} />
                        </a>
                        <a className="hover:text-blue-500 transition text-sm">
                            <FaWhatsapp size={20} />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full md:w-auto justify-center md:justify-end">
                    <a className="text-gray-400 hover:text-white transition text-sm">سياسة الخصوصية</a>
                    <a className="text-gray-400 hover:text-white transition text-sm">شروط الاستخدام</a>
                    <a className="text-gray-400 hover:text-white transition text-sm">اتصل بنا</a>
                    <a className="text-gray-400 hover:text-white transition text-sm">الأسئلة الشائعة</a>
                    <a className="text-gray-400 hover:text-white transition text-sm">عن الموقع</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
