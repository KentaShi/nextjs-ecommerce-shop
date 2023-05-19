import OrderIItem from "@/components/OrderIItem"
import { getData } from "@/utils/fetchData"
import Head from "next/head"
import React from "react"

const orders = ({ orders }) => {
    return (
        <div>
            <Head>
                <title>Tất Cả Đơn Hàng</title>
            </Head>
            {orders.length === 0 ? (
                <div>Không có đơn nào.</div>
            ) : (
                <div className='flex flex-col items-center'>
                    {orders.map((item, index) => (
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

export default orders
