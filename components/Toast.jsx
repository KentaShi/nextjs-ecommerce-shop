import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ msg: { msg, title } }) => {
    const notify = () => {
        if (title === "error") {
            return toast.error(msg);
        }
        if (title === "success") {
            return toast.success(msg);
        }
    };
    notify();
    return (
        <div>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </div>
    );
};

export default Toast;
