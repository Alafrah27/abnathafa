import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/Axios";
import { toast } from "react-toastify";

export function GetAllPlans() {
    const { data: plans, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosInstance.get("/subscription/all");
            return res.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    })

    return { plans, error, isLoading };
}