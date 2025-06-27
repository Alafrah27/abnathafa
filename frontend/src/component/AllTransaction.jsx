import { useNavigate } from "react-router-dom"
import { formatCurrency, formatDate } from "../lib/Date-fns"
import { GetAllPayment } from "../services/useGetPayment"


function AllTransaction() {
    const navigate = useNavigate()
    const { payment, isLoading, error } = GetAllPayment()

    if (!payment || payment.length === 0) return <p>no transcation</p>

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <div className="w-full h-screen flex flex-col ">


            <div className="mt-6 w-full">
                {payment?.map((transaction) => (
                    <div className="bg-white shadow-md rounded-lg  mb-4 flex items-center gap-4 w-full py-2 px-3 cursor-pointer" key={transaction._id} onClick={() => navigate(`/payment/${transaction._id}`)} >
                        <img
                            src={transaction?.userId?.avatar || "pro.png"}
                            alt={transaction?.userId?.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-center gap-2">

                                    <h2 className="font-bold text-lg">{transaction?.userId?.name} {transaction?.userId?.familyname}</h2>
                                    <span className="text-blue-600 font-bold text-[14px]">{formatCurrency(transaction.amount)}

                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-2">

                                    <span className="text-gray-400 text-[12px] font-semibold">{formatDate(transaction.createdAt)}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                    ${transaction.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                        {transaction.status}
                                    </span>
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllTransaction