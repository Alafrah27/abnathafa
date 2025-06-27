// import { useMutation, useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/Axios";
// import { toast } from "react-toastify";

// export function UseAddLiks() {
//     const { mutate: AddLike, isPending } = useMutation({
//         mutationFn: async (postId) => {
//             const res = await axiosInstance.post(`/comment-post/like/${postId}`);
//             return res.data;
//         },
//         onSuccess: (res) => {

//             toast.success(res.message);

//         },
//         onError: (error) => {
//             toast.error(error.response.data.message);
//         },
//     });

//     return { AddLike, isPending };
// }
// export function UseAddComment() {

//     const { mutate: AddComment, isPending } = useMutation({
//         mutationFn: async ({ postId, data }) => {
//             const res = await axiosInstance.post(`/comment-post/create/${postId}`, data);
//             return res.data;
//         },
//         onSuccess: (res) => {
//             toast.success(res.message);
//             // Invalidate the cache for the specific postId

//         },
//         onError: (error) => {
//             toast.error(error.response.data.message);
//         },
//     });

//     return { AddComment, isPending };
// }

// export function UseGetComments(postId) {
//     const { data: getComment, isLoading, error } = useQuery({
//         queryKey: ['getComment', postId], // include postId to make cache unique
//         queryFn: async () => {
//             const res = await axiosInstance.get(`/comment-post/all/${postId}`);
//             return res.data;
//         },
//         onSuccess: (res) => {
//             console.log("Comments fetched successfully", res);
//         },
//         onError: (error) => {
//             toast.error(error.response.data.message);
//         },
//     });

//     return { getComment, isLoading, error };
// }