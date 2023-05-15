import OrderIItem from "@/components/OrderIItem"
import { DataContext } from "@/store/globalState"
import { getData } from "@/utils/fetchData"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

const Orders = ({ orders }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state

    const filterOrderByUser = orders.filter((item) => item.userID === user?._id)

    return (
        <div>
            <Head>
                <title>Đơn Hàng Của Bạn</title>
            </Head>
            {filterOrderByUser.length === 0 ? (
                <div>Bạn không có đơn nào.</div>
            ) : (
                <div className='flex flex-col items-center'>
                    {filterOrderByUser.map((item, index) => (
                        <OrderIItem key={index} order={item} />
                    ))}
                </div>
            )}
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await getData("order")
    return {
        props: { orders: res.orders || null, result: res.result || null },
    }
}

export default Orders
