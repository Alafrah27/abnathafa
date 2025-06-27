import { ArrowBigRight, ArrowRight, CopyCheck, LoaderCircle, PenBoxIcon } from "lucide-react"
import { IoSend } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { UseMusdarAi } from "../services/useAimodul"
import { useState } from "react"
import { axiosInstance } from "../lib/Axios"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

function MusdarAi() {
    const [text, setText] = useState("")
    const [result, setResult] = useState("")
    console.log("result ", result);
    const navigate = useNavigate()

    // Function to format the text properly
    const formatText = (text) => {
        if (!text) return "";

        return text
            .replace(/\*\*/g, '') // Remove all ** markers
            .replace(/\*/g, '\n') // Replace single * with line breaks
            .replace(/:/g, ':\n') // Add line break after colons
            .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple line breaks with double line breaks
            .trim();
    }

    const {
        mutate: MusdarModulAi,
        isPending
    } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post("/musdarai/result", {
                text: text
            });
            const data = res.data;
            // Fix: Properly set the formatted result
            setResult(formatText(data.text));
            return data;
        },
        onSuccess: () => {
            console.log("success");
            setText("");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "حدث خطأ في النظام");
        },
    });

    const MusdarhandelSubmit = (e) => {
        e.preventDefault();

        // Validate input
        if (!text.trim()) {
            toast.error("من فضلك أدخل النص");
            return;
        }

        MusdarModulAi();
    };

    // Function to render formatted text with proper line breaks
    const renderFormattedText = (text) => {
        if (!text) return null;

        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div className="w-full lg:max-w-7xl mx-auto h-screen flex flex-col px-4 py-2">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold mb-12" role="button" onClick={() => navigate(-1)}>
                    <ArrowRight size={30} className="inline-block text-blue-600" />
                </h1>
                <h1 role="button">
                    <PenBoxIcon
                        size={30}
                        className="inline-block text-blue-600"
                        onClick={() => {
                            setText("")
                            setResult("")
                        }}
                    />
                </h1>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
                {!text && !result && !isPending && (
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h1 className="text-3xl font-bold mb-12 bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text text-transparent text-center">
                            <span className="inline-block bg-clip-text text-transparent">
                                Musdar Ai
                            </span>
                            <br />
                            مساعدك الذكى
                        </h1>
                    </div>
                )}

                {isPending && (
                    <div className="container mx-auto flex flex-col px-4 py-2">
                        <div className="flex gap-4 items-start bg-blue-100 text-blue-600 p-4 rounded-lg">
                            <LoaderCircle size={20} className="inline-block text-blue-600 animate-spin flex-shrink-0 mt-1" />
                            <div className="flex flex-col gap-2">
                                <h1 className="text-sm leading-4 font-bold">جاري البحث عن النتائج</h1>
                                <p className="text-xs font-bold leading-4">من فضلك انتظر</p>
                            </div>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="container mx-auto flex flex-col px-4 py-2">
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="text-sm font-medium text-gray-600 mb-2">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                    سؤالك
                                </span>
                            </div>
                            <p className="text-sm font-bold text-gray-800 leading-6">
                                {text}
                            </p>
                        </div>

                        <div className=" rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-600 mb-3">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                    إجابة مسدار
                                </span>
                            </div>
                            <div className="text-sm font-medium text-gray-800 leading-7 whitespace-pre-wrap">
                                {renderFormattedText(result)}
                            </div>
                            <div>
                                <button
                                 className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-4 flex items-center gap-2"
                                 onClick={() => {
                                    navigator.clipboard.writeText(result);
                                    toast.success("تم نسخ النص");
                                }}>
                                    نسخ
                                    <CopyCheck size={20} className="inline-block text-blue-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t pt-4">
                <form className="flex items-center gap-3 w-full" onSubmit={MusdarhandelSubmit}>
                    <button
                        type="submit"
                        disabled={isPending || !text.trim()}
                        className="outline-none border-none py-2 px-4 disabled:opacity-50 hover:bg-blue-50 rounded-full transition-colors"
                    >
                        <IoSend size={30} className="text-blue-600" />
                    </button>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="اكتب سؤالك هنا..."
                        className="w-full placeholder:text-[13px] placeholder:font-bold bg-gray-100 rounded-[20px] text-[14px] font-semibold py-3 px-5 focus:border-2 focus:border-blue-600 outline-none resize-none h-14 transition-all"
                        disabled={isPending}
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                MusdarhandelSubmit(e);
                            }
                        }}
                    />
                </form>
            </div>
        </div>
    )
}

export default MusdarAi

