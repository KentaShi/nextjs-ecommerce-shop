import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

const admin = (Component) => {
    return () => {
        const [state, dispatch] = useContext(DataContext)
        const {
            auth: { user },
        } = state
        const router = useRouter()

        useEffect(() => {
            if (user?.role !== "admin") {
                router.push("/")
            }
        }, [])

        return <Component />
    }
}
export default admin
