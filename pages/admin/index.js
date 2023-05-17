import React, { useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"

const admin = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state
    const router = useRouter()

    if (user?.role === "user") {
        router.push("/")
    }

    return <div>admin</div>
}

export default admin
