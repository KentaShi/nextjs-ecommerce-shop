import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

const isAdmin = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state

    return user.role === "admin"
}
export default isAdmin
