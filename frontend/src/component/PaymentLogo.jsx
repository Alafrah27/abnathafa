import { useNavigate } from "react-router-dom"

function PaymentLogo() {
    const navigate = useNavigate()
    return (
        <div className="w-full my-8  ">
            <div className="container mx-auto h-full p-2 flex  flex-col-reverse lg:flex-row items-center gap-4  bg-blue-600">

                <div className=" w-full lg:w-2/3 flex flex-col lg:px-4" >
                    <p className="text-lg text-justify font-semibold text-white">
                        تقدم أنظمتنا طرق دفع متنوعة وآمنة لضبط عملياتك المالية بكل سهولة. نوفر لك معلومات واضحة عن خيارات الدفع، بالإضافة إلى دعم فني مستمر لمساعدتك على إتمام معاملتك بدون أي صعوبة. ثقتك بطرق الدفع لدينا تضمن لك عملية شراء مريحة وخالية من التعقيدات.
                    </p>
                    <button onClick={() => {
                        navigate("/pricing")
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }} className="bg-white text-blue-600 font-semibold  py-2 px-4 rounded-lg my-8 hover:bg-blue-100 transition duration-300 ease-in-out">
                        ادفع الأن
                    </button>
                </div>
                <div className="w-2/3">
                    <img src="/phone.png" alt="phonelogo" className="w-full h-full flex justify-center items-center object-cover" />
                </div>
            </div>

        </div>
    )
}

export default PaymentLogo
