import React, { useContext } from "react"
//import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast"
import { DataContext } from "@/store/globalState"

const Toast = ({ msg: { msg, title } }) => {
    const [state, dispatch] = useContext(DataContext)
    const notify = () => {
        if (title === "error") {
            toast.error(msg)
            dispatch({
                type: "NOTIFY",
                payload: {},
            })
        }
        if (title === "success") {
            toast.success(msg)
            dispatch({
                type: "NOTIFY",
                payload: {},
            })
        }
    }
    // notify();
    return <div>{notify()}</div>
}

export default Toast
