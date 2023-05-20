import { getData } from "@/utils/fetchData"
import React from "react"

const OrderDetail = ({ order }) => {
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
