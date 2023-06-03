import OrderIItem from "@/components/Order"
import { getData, updateData } from "@/utils/fetchData"
import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import { PencilIcon } from "@heroicons/react/24/solid"
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DataContext } from "@/store/globalState"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import OrderItem from "@/components/admin/OrderItem"
import DeniedAccess from "@/components/DeniedAccess"

const TABLE_HEAD = ["User", "Amount", "Date", "Status", "Action"]

const Orders = ({ orders }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    if (!checkIfUserIsAdmin(user)) {
        return <DeniedAccess />
    }

    return (
        <div>
            <Head>
                <title>Tất Cả Đơn Hàng</title>
            </Head>
            <Card className='h-full w-full'>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className='rounded-none'
                >
                    <div className='mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center'>
                        <div>
                            <Typography variant='h5' color='blue-gray'>
                                Danh Sách Đơn Hàng
                            </Typography>
                            <Typography
                                color='gray'
                                className='mt-1 font-normal'
                            >
                                Tổng: {orders.length} đơn hàng
                            </Typography>
                        </div>
                        <div className='flex w-full shrink-0 gap-2 md:w-max'>
                            <div className='w-full md:w-72'>
                                <Input
                                    label='Search'
                                    icon={
                                        <MagnifyingGlassIcon className='h-5 w-5' />
                                    }
                                />
                            </div>
                            <Button
                                className='flex items-center gap-3'
                                color='blue'
                                size='sm'
                            >
                                <ArrowDownTrayIcon
                                    strokeWidth={2}
                                    className='h-4 w-4'
                                />{" "}
                                Download
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className='overflow-scroll px-0'>
                    <table className='w-full min-w-max table-auto text-left'>
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        colSpan={head === "Action" ? 4 : 1}
                                        key={index}
                                        className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 '
                                    >
                                        <Typography
                                            variant='small'
                                            color='blue-gray'
                                            className='font-normal leading-none opacity-70'
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const isLast = index === orders.length - 1
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50"

                                return (
                                    <OrderItem
                                        key={index}
                                        classes={classes}
                                        order={order}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
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
