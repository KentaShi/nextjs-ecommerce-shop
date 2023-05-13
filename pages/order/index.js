import { DataContext } from "@/store/globalState"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

const Orders = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state

    const router = useRouter()

    const {
        cart: { totalPrice },
    } = state

    return (
        <div>
            <p>list order here</p>
            <Link href={"/order/1232"}>order detail</Link>
        </div>
    )
}

export default Orders
