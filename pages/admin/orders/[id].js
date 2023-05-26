import DeniedAccess from "@/components/DeniedAccess"
import { DataContext } from "@/store/globalState"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import { getData } from "@/utils/fetchData"
import React, { useContext } from "react"

const OrderDetail = ({ order }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    if (!checkIfUserIsAdmin(user)) {
        return <DeniedAccess />
    }

    return <div>OrderDetail: {order._id}</div>
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await getData("order")

    // Get the paths we want to pre-render based on posts
    const paths = res.orders.map((order) => ({
        params: { id: order._id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params: { id } }) {
    const res = await getData(`order/${id}`)
    return { props: { order: res.order } }
}

export default OrderDetail
