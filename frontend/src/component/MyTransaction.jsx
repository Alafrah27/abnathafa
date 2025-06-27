import { useNavigate } from "react-router-dom"
import { formatCurrency, formatDate } from "../lib/Date-fns"
import { GetUserPayment } from "../services/useGetPayment"

// const transcation = [
//     {
//         id: 1,
//         content: "تحويلاتي ",
//         amount: 100,
//         date: "2023-10-01",
//         status: "مكتمل",
//         name: "ali edris yassin",
//         image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
//     },
//     {
//         id: 2,
//         content: 'التحويلات',
//         amount: 200,
//         date: "2023-10-02",
//         status: "معلق",
//         name: "mohamed ahmed",
//         image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
//     },
//     {
//         id: 3,
//         content: 'المناسبات',
//         amount: 300,
//         date: "2023-10-03",
//         status: "مكتمل",
//         name: "sara mohamed",
//         image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
//     },
//     {
//         id: 4,
//         content: 'الملف الشخصي',
//         amount: 400,
//         date: "2023-10-04",
//         status: "مكتمل",
//         name: "ahmed ali",
//         image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
//     }, {
//         id: 5,
//         content: 'التحويلات',
//         amount: 500,
//         date: "2023-10-05",
//         status: "معلق",
//         name: "yassin ali",
//         image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
//     }


// ]
function MyTransaction() {
    const navigate = useNavigate()
    const { payment, isLoading, error } = GetUserPayment()

    if (!payment || payment.length === 0) return <p>no transcation</p>

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <div className="w-full h-screen flex flex-col ">


            <div className="mt-6 w-full">
                {payment?.map((transaction) => (
                    <div className="bg-white shadow-md rounded-lg  mb-4 flex items-start gap-4 w-full py-2 px-3 cursor-pointer" key={transaction._id} onClick={() => navigate(`/payment/${transaction._id}`)} >
                        <img
                            src={transaction?.userId?.avatar || "pro.png"}
                            alt={transaction?.userId?.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-center  gap-2">

                                    <h2 className="font-bold text-lg">{transaction?.userId?.name}</h2>
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

export default MyTransaction