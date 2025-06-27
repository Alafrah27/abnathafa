import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/Axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


export function GetUserPayment() {
    const { data: payment, error, isLoading } = useQuery({
        queryKey: ["payment"],
        queryFn: async () => {
            const res = await axiosInstance.get("/payment-stripe/user-payment");
            return res.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    })

    return { payment, error, isLoading };
}
export function GetAllPayment() {
    const { data: payment, error, isLoading } = useQuery({
        queryKey: ["allpayment"],
        queryFn: async () => {
            const res = await axiosInstance.get("/payment-stripe/all-payment");
            return res.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    })

    return { payment, error, isLoading };
}


export function GetUserInvoice() {
    const { id } = useParams()
    const { data: invoice, error, isLoading } = useQuery({
        queryKey: ["invoice", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payment-stripe/${id}`);
            return res.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    })

    return { invoice, error, isLoading };
}