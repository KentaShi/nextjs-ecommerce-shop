import React from "react"
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
    Breadcrumbs,
} from "@material-tailwind/react"
import {
    CheckCircleIcon,
    TruckIcon,
    ClipboardIcon,
} from "@heroicons/react/24/solid"
import Head from "next/head"
import { getData } from "@/utils/fetchData"
import Link from "next/link"

const DetailOrder = ({ order }) => {
    const Status = ({ name, time }) => {
        switch (name) {
            case "pending":
                return (
                    <p>
                        Đã Đặt Hàng Vào Lúc{" "}
                        <span className='text-coca-medium-dark'>
                            {new Date(time).toLocaleString("id-ID")}
                        </span>
                    </p>
                )
            case "delivering":
                return (
                    <p>
                        Đand Giao Hàng{" "}
                        <span className='text-coca-medium-dark'>
                            {new Date(time).toLocaleString("id-ID")}
                        </span>
                    </p>
                )
            case "paid":
                return (
                    <p>
                        Đã Giao Hàng Vào Lúc{" "}
                        <span className='text-coca-medium-dark'>
                            {new Date(time).toLocaleString("id-ID")}
                        </span>
                    </p>
                )
        }
    }
    const displayDetailStatus = (name) => {
        return name === "paid"
            ? "Giao hàng thành công"
            : name === "delivering"
            ? "Đang giao hàng"
            : "Đã đặt hàng"
    }
    const displayIconStatus = (name) => {
        return name === "paid" ? (
            <TimelineIcon className='p-1' color='green'>
                <CheckCircleIcon className='h-4 w-4' />
            </TimelineIcon>
        ) : name === "delivering" ? (
            <TimelineIcon className='p-1'>
                <TruckIcon className='h-4 w-4' />
            </TimelineIcon>
        ) : (
            <TimelineIcon className='p-1' color='orange'>
                <ClipboardIcon className='h-4 w-4' />
            </TimelineIcon>
        )
    }
    return (
        <div className='flex flex-col items-center justify-between'>
            <Head>
                <title>Theo Dõi Đơn Hàng | AnhAnh Nè</title>
            </Head>
            <div className='flex justify-start items-center'>
                <div className='w-2/3'>
                    <Breadcrumbs>
                        <Link className='opacity-60' href={"/"}>
                            Trang Chủ
                        </Link>
                        <Link className='opacity-60' href={"/order"}>
                            Đơn Hàng
                        </Link>
                        <span>Chi Tiết</span>
                    </Breadcrumbs>
                </div>
            </div>
            <div className='rounded-lg shadow-lg p-6 w-[auto] xsm:w-[22rem] sm:w-[32rem] '>
                <Status
                    name={order.status[order.status.length - 1].statusName}
                    time={order.status[order.status.length - 1].statusTime}
                />
                <hr className='my-3' />
                <div>
                    <p className='font-semibold'>Thông Tin Nhận Hàng</p>
                    <p>Sđt: {order.phone}</p>
                    <p>Địa Chỉ: {order.address}</p>
                </div>
            </div>
            <div className='flex justify-center w-[auto] xsm:w-[22rem] sm:w-[32rem] rounded-lg shadow-lg p-6'>
                <Timeline>
                    {order.status
                        .map((item, index) => (
                            <TimelineItem key={index}>
                                <TimelineConnector />
                                <TimelineHeader className='h-3'>
                                    {displayIconStatus(item.statusName)}
                                    <p className='leading-none font-bold'>
                                        {displayDetailStatus(item.statusName)}
                                    </p>
                                </TimelineHeader>
                                <TimelineBody className='pb-8'>
                                    <p className='font-normal text-sm text-gray-600'>
                                        {new Date(
                                            item.statusTime
                                        ).toLocaleString("id-ID")}
                                    </p>
                                </TimelineBody>
                            </TimelineItem>
                        ))
                        .reverse()}
                </Timeline>
            </div>
        </div>
    )
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

export default DetailOrder
