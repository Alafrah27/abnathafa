
import { PrinterCheck, XCircle } from "lucide-react";
import { HiBackward } from "react-icons/hi2";

function CancellPayment() {
    const handleGoHome = () => {
        // Replace with your navigation logic
        console.log("Navigate to home");
        window.location.href = "/pricing";
    };



    return (
        <div className="min-h-screen bg-gradient-to-br ">
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
                {/* Success Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
                    {/* Success Icon */}
                    <div className="mb-8">
                        <div className="w-24 h-24 bg-red-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <XCircle className="text-red-600" size={40} />
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                            لم يتم الدفع بنجاح حاول مرة اخرى 
                        </h1>

                    </div>

                    {/* Payment Details */}


                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleGoHome}
                            className="w-full bg-red-200 text-red-700 font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <HiBackward size={20} />
                            حاول مرة اخرى
                        </button>


                    </div>
                </div>

                {/* Footer */}

            </div>
        </div>
    );
}

export default CancellPayment
