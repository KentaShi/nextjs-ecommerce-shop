import React from "react"
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react"
import {
    CheckCircleIcon,
    TruckIcon,
    ClipboardIcon,
} from "@heroicons/react/24/solid"
import Head from "next/head"
import { getData } from "@/utils/fetchData"

const DetailOrder = ({ order }) => {
    return (
        <div className='flex flex-col items-center justify-between'>
            <Head>
                <title>Theo Dõi Đơn Hàng | AnhAnh Nè</title>
            </Head>
            <div className='rounded-lg shadow-lg p-6 w-[32rem]'>
                <p>
                    Đã Đặt Hàng Vào Lúc{" "}
                    <span className='text-coca-medium-dark'>
                        {new Date(order.updatedAt).toLocaleString("id-ID")}
                    </span>
                </p>
                <hr className='my-3' />
                <div>
                    <p className='font-semibold'>Địa Chỉ Nhận Hàng</p>
                    <p>Sđt: {order.phone}</p>
                    <p>Địa Chỉ: {order.address}</p>
                </div>
            </div>
            <div className='flex justify-center w-[32rem] rounded-lg shadow-lg p-6'>
                <Timeline>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className='h-3'>
                            <TimelineIcon className='p-1' color='green'>
                                <CheckCircleIcon className='h-4 w-4' />
                            </TimelineIcon>
                            <Typography
                                variant='h6'
                                color='blue-gray'
                                className='leading-none'
                            >
                                Đã Giao Hàng
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className='pb-8'>
                            <Typography
                                variant='small'
                                color='gary'
                                className='font-normal text-gray-600'
                            >
                                16/05/2023
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className='h-3'>
                            <TimelineIcon className='p-1'>
                                <TruckIcon className='h-4 w-4' />
                            </TimelineIcon>
                            <Typography
                                variant='h6'
                                color='blue-gray'
                                className='leading-none'
                            >
                                Đang Vận Chuyển
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className='pb-8'>
                            <Typography
                                variant='small'
                                color='gary'
                                className='font-normal text-gray-600'
                            >
                                16/05/2023
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader className='h-3'>
                            <TimelineIcon className='p-1' color='orange'>
                                <ClipboardIcon className='h-4 w-4' />
                            </TimelineIcon>
                            <Typography
                                variant='h6'
                                color='blue-gray'
                                className='leading-none'
                            >
                                Đơn Đã Đặt
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody>
                            <Typography
                                variant='small'
                                color='gary'
                                className='font-normal text-gray-600'
                            >
                                {new Date(order.createdAt).toLocaleString(
                                    "id-ID"
                                )}
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
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
