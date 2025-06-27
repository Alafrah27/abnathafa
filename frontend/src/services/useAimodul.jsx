import { toast } from "react-toastify";
import { axiosInstance } from "../lib/Axios";
import { useMutation } from "@tanstack/react-query";

export function UseMusdarAi() {



    const { mutate: MusdarModulAi, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/musdarai/result", data);
            return res.data;
        },
        onSuccess: () => {
            console.log("success");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { MusdarModulAi, isPending };
}