import React, { useContext } from "react"
import { DataContext } from "@/store/globalState"
import Toast from "./Toast"
import Loading from "./Loading"

const Notify = () => {
    const [state, dispatch] = useContext(DataContext)
    const { notify } = state
    return (
        <>
            {notify.loading && <Loading />}
            {notify.error && (
                <Toast msg={{ msg: notify.error, title: "error" }} />
            )}
            {notify.success && (
                <Toast
                    position='bottom-center'
                    reverseOrder={true}
                    msg={{ msg: notify.success, title: "success" }}
                />
            )}
        </>
    )
}

export default Notify
