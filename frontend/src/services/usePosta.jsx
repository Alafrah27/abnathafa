import { useNavigate } from "react-router-dom";

import {
    useMutation,
    useQuery,
    useQueryClient,

} from "@tanstack/react-query";
import { axiosInstance } from "../lib/Axios";
import { toast } from "react-toastify";




export function GetAllPosts() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosInstance.get("/post/all");
            return res.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    })

    return { posts, error, isLoading };
}

export function GetMyPosts() {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ["myposts"],
        queryFn: async () => {
            const res = await axiosInstance.get("/post/my-posts");
            return res.data;
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    })

    return { posts, error, isLoading };
}


export function UsePost() {
    const navigate = useNavigate();




    const { mutate: CreatePost, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/post/create", data);
            return res.data;
        },
        onSuccess: (res) => {

            toast.success(res.message);
            navigate("/posts");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { CreatePost, isPending };
}



export function UseAddLik() {
    const queryclient = useQueryClient();
    const { mutate: AddLike, isPending } = useMutation({

        mutationFn: async (postId) => {
            const res = await axiosInstance.post(`/post/${postId}/like`);
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["posts"]);
            queryclient.invalidateQueries(["post", res.postId]);
            toast.success(res.message);

        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { AddLike, isPending };
}



export function UseAddComment() {
    const queryclient = useQueryClient();
    const { mutate: AddComment, isPending } = useMutation({

        mutationFn: async ({ postId, comment }) => {
            const res = await axiosInstance.post(`/post/${postId}/comment`, comment);
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["posts"]);
            queryclient.invalidateQueries(["post", res.postId]);
            toast.success(res.message);

        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { AddComment, isPending };
}


export function UseDeletePost() {
    const queryclient = useQueryClient();
    const { mutate: DeletePost, isPending } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.delete(`/post/${id}`);
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["posts"]);
            toast.success(res.message);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { DeletePost, isPending };
}   