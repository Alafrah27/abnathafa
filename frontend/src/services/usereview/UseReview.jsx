import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UseGetComments() {
    const { data: getComment, isLoading, error } = useQuery({
        queryKey: ['getComment'], // include postId to make cache unique
        queryFn: async () => {
            const res = await axiosInstance.get(`/review/all`);
            return res.data;
        },
        onSuccess: (res) => {
            console.log("Comments fetched successfully", res);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { getComment, isLoading, error };
}


export function UseAddComment() {
    const navigate = useNavigate();
    const queryclient = useQueryClient();

    const { mutate: addreview, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/review/add", data);
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["user"]);
            queryclient.invalidateQueries(["getComment"]);
            toast.success(res.message);
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { addreview, isPending };
}