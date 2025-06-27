import { useRef } from "react";
import { HiPrinter } from "react-icons/hi2";
import { formatCurrency, formatDate } from "../lib/Date-fns";
import { GetUserInvoice } from "../services/useGetPayment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { UserInfo } from "../services/useAuth";
import Navbar from "../component/Navbar";

function InvoicePayment() {
    const printRef = useRef(null)
    const { invoice, isLoading } = GetUserInvoice()
    const { User } = UserInfo()
    console.log(" from invoice", invoice);
    const handlePdfDownload = async () => {
        const element = printRef.current;
        if (!element) return;

        // Generate canvas image from the element
        const canvas = await html2canvas(element, {
            scale: 2, // Adjust scaling for better quality
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const imgProperties = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        // Check to fit the image on one page
        if (imgHeight > pdfHeight) {
            // Reduce scale until it fits
            const scaleFactor = pdfHeight / imgHeight;
            const finalWidth = pdfWidth; // same width
            const finalHeight = imgHeight * scaleFactor;

            pdf.addImage(imgData, "PNG", 0, 0, finalWidth, finalHeight);
        } else {
            // Image fits within the PDF page
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
        }

        pdf.save("invoice.pdf");
    };

    if (isLoading) {
        return <div>

            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        </div>
    }
    return (
        <>

            <Navbar />
            <div className="w-full h-screen bg-white py-4 p-1 flex flex-col items-center justify-center">
                <div className="w-full lg:max-w-4xl mx-auto ">
                    <div
                        ref={printRef}
                        className="invoice-container w-full p-4 px-6 bg-white border border-gray-200 text-sm shadow-md "
                    >
                        {/* <div className="flex items-center justify-center">
                        <img src="/logo.png" alt="logo image" className="w-[100px] h-16 object-cover " />
                     </div> */}
                        <div className="flex justify-between items-start w-full">
                            <div className="flex flex-col ">
                                <h1 className="text-xl font-bold text-gray-800">سند القبض </h1>
                                <p className="text-sm text-gray-600 font-semibold">
                                    فاتورة # {formatDate(new Date())}
                                </p>
                            </div>
                            <div className=" flex flex-col items-center gap-3 ">

                                <div className="flex flex-col p-0 ">
                                    <h1 className="text-sm text-gray-600 font-bold ">
                                        رابطة ابناء طفع
                                    </h1>
                                    <h1 className="text-sm text-gray-600 font-semibold ">المملكة العربية السعودية</h1>
                                    <h1 className="text-sm text-gray-600 font-semibold ">مدينة الرياض</h1>
                                </div>


                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3  flex-1 ">
                            <h1 className="text-sm  font-semibold text-center mt-16 ">
                                السلام عليكم ورحمة الله وبركاته
                            </h1>
                            <p className="text-black font-semibold mb-12 text-center">
                                لتأكيد صحة الفاتورة وأمانها، يمكن طباعة الفاتورة فقط من خلال الموقع الرسمي بواسطة المسؤولين المعنيين،او المستخدم نفسه ولا تتوفر أي طباعة خارج هذا الإجرا
                            </p>

                        </div>


                        <table className="w-full mb-8 border-collapse p-5">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2 text-left">الاسم الاكامل</th>
                                    <th className="border p-2 text-right">نوع الاشتراك</th>
                                    <th className="border p-2 text-right">المبلغ</th>
                                    <th className="border p-2 text-right">المجموع</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2 font-semibold">{invoice?.userId?.name} {invoice?.userId?.lastname}</td>
                                    <td className="border p-2 text-right font-semibold">
                                        {invoice?.subscripeId?.plan === "free" ? "تبرع اختياري" : invoice?.subscripeId?.plan}
                                    </td>
                                    <td className="border p-2 text-right font-semibold">
                                        {formatCurrency(invoice?.amount)}
                                    </td>
                                    <td className="border p-2 text-right font-semibold">
                                        {formatCurrency(invoice?.amount)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex flex-col items-center gap-3  mb-5 ">
                            <h1 className="text-sm font-semibold text-center mt-16">شكراً لكم من القلب</h1>
                            <p className="mt-4   max-w-md mx-auto font-semibold">
                                نود أن نعبر لكم عن عميق امتناننا وتقديرنا لتبرعكم الكريم ودعمكم السخي.
                                إن مساهمتكم القيمة تلهمنا وتدفعنا للمضي قدماً في تحقيق رسالتنا
                                لخدمة المجتمع وتعزيز السلامة والأمان للجميع. بفضلكم، نستطيع أن نصنع فرقاً حقيقياً ونبني مستقبلاً أفضل للجميع.
                                شكراً من القلب على كرمكم وثقتكم.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">

                        {invoice?.userId?._id === User?._id ?

                            <button
                                onClick={handlePdfDownload}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
                            >
                                <HiPrinter size={20} />
                                Download PDF
                            </button>
                            : ""}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoicePayment
