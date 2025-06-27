

import {
    useMutation,
    useQuery,
    useQueryClient,

} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, } from "react-router-dom";
import { axiosInstance } from "../lib/Axios";
export function UserInfo() {
    const { data: User } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosInstance.get("/user/profile");
            return res.data;
        },
    });

    return { User };
}
export function UseRegister() {
    const navigate = useNavigate();

    const queryclient = useQueryClient();


    const { mutate: Register, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/user/register", data);
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["user"]);
            toast.success(res.message);
            navigate("/posts");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { Register, isPending };
}
export function UseLogin() {
    const navigate = useNavigate();
    const queryclient = useQueryClient();

    const { mutate: login, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/user/login", data);
            return res.data;
        },
        onSuccess: (res) => {
            queryclient.invalidateQueries(["user"]);
            toast.success(res.message);
            navigate("/posts");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { login, isPending };
}

export function UserUpdate() {

    const queryclient = useQueryClient();
    const { mutate: updateuser, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.put("/user/update-myaccount", data);
            return res.data;
        },
        onSuccess: () => {

            toast.success("تم تحديث الحساب بنجاح");
            queryclient.invalidateQueries(["user"]);

        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { updateuser, isPending };
}


export function UseLogout() {
    const navigate = useNavigate();
    const queryclient = useQueryClient();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: async () =>
            await axiosInstance.post("/user/logout"),


        onSuccess: () => {
            queryclient.invalidateQueries(["user"]);
            toast.success("تم تسجيل الخروج بنجاح");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    return { logout, isPending };
}