import Order from "@/components/Order"
import { DataContext } from "@/store/globalState"
import { getData } from "@/utils/fetchData"
import { Breadcrumbs } from "@material-tailwind/react"
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
            <div className='flex justify-center items-center'>
                <div className='w-2/4'>
                    <Breadcrumbs>
                        <Link className='opacity-60' href={"/"}>
                            Trang Chủ
                        </Link>
                        <span>Đơn Hàng</span>
                    </Breadcrumbs>
                </div>
            </div>
            {filterOrderByUser.length === 0 ? (
                <div>Bạn không có đơn nào.</div>
            ) : (
                <div className='flex flex-col items-center'>
                    {filterOrderByUser
                        .map((item, index) => (
                            <Order key={index} order={item} />
                        ))
                        .reverse()}
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
