import { Check, Home, Receipt } from "lucide-react";
import { useEffect } from "react";
import { axiosInstance } from "../lib/Axios";
import { toast } from "react-toastify";
import { useState } from "react";

function SuccessPayment() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const cheeckOutFn = async (sessionId ) => {

            try {

                await axiosInstance.post('/payment-stripe/checkout-success', {
                    sessionId 
                })
            } catch (error) {
                console.log(error);
                toast.error("حصلت مشكلة في السيرفر");
            } finally {
                setIsLoading(false)
            }
        }

        const sessionId = new URLSearchParams(window.location.search).get('session_id')
        cheeckOutFn(sessionId)
    }, [])
    const handleGoHome = () => {
        // Replace with your navigation logic
        console.log("Navigate to home");
        window.location.href = "/";
    };

    if (isLoading) return <div>
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
        </div>
    </div>

    return (
        <div className="min-h-screen bg-gradient-to-br ">
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
                {/* Success Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
                    {/* Success Icon */}
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-blue-700 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <Check className="text-white" size={40} />
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                            شكرًا لك على الدفع بنجاح
                        </h1>

                    </div>

                    {/* Payment Details */}


                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleGoHome}
                            className="w-full bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            العودة للرئيسية
                        </button>


                    </div>
                </div>

                {/* Footer */}

            </div>
        </div>
    );
}

export default SuccessPayment;
