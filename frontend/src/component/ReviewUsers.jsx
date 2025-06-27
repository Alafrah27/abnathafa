import { Star } from "lucide-react"
import { FaStar } from "react-icons/fa"
import { UseGetComments } from "../services/usereview/UseReview"




function ReviewUsers() {
    const { getComment, isLoading, error } = UseGetComments()
    if (isLoading) {
        return <div className="text-center text-gray-500">جارٍ تحميل المراجعات...</div>;
    }
    if (!getComment || getComment.length === 0) {
        return <div className="text-center text-blue-900 bg-blue-400 p-4 h-24 flex items-center justify-center rounded-lg">
            <h1>   لا توجد مراجعات حتى الآن.</h1>
        </div>;
    }
    if (error) {
        return <div className="text-center text-red-500">حدث خطأ أثناء تحميل المراجعات: {error.message}</div>;
    }
    return (
        <div className="w-full mt-4">
            <div className="container mx-auto mb-12  h-[70%] p-2 flex flex-col gap-4">
                <h1 className="text-3xl font-bold mb-4 text-center ">مراجعة المستخدمين</h1>

                <ul className=" scrollbar-hide flex overflow-x-auto   items-center gap-4">
                    {
                        getComment?.map((item) => (
                            <li key={item._id} className="flex flex-col gap-2 mb-4 mt-2 bg-white p-4 rounded-2xl w-64 min-w-[300px]">
                                <div className="p-2">
                                    <img src={item?.user?.avatar} alt={item.name} className="w-20 h-20 mx-auto rounded-full object-cover" />
                                    <h3 className="text-lg font-semibold text-blue-600 text-center mb-5">{item?.user?.name}</h3>
                                    <div className="flex items-center justify-center">

                                        {Array.from({ length: Math.round(item.rating) }).map((_, index) => (
                                            <h1 key={index} className="text-yellow-500 "><FaStar size={15} /></h1>
                                        ))}
                                    </div>
                                    <p className="mt-2 text-center text-sm text-gray-700">{item.comment}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ReviewUsers


