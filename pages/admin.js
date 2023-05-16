import React, { useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"

const admin = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user])
    return <div>admin</div>
}

export default admin
