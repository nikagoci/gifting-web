import { toast } from "react-toastify";

export default function toastError(message: string) {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: 0,
        theme: "light",
        });
} 