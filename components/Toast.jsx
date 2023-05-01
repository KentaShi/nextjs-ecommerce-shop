import React, { useContext } from "react";
import { toast } from "react-toastify";
import { DataContext } from "@/store/globalState";

const Toast = ({ msg: { msg, title } }) => {
    const [state, dispatch] = useContext(DataContext);
    const notify = () => {
        if (title === "error") {
            return toast.error(msg);
        }
        if (title === "success") {
            return toast.success(msg);
        }
    };
    // notify();
    return <div>{notify()}</div>;
};

export default Toast;
