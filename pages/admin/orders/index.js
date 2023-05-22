import OrderIItem from "@/components/OrderIItem"
import { getData } from "@/utils/fetchData"
import Head from "next/head"
import React, { useContext, useEffect } from "react"
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

const TABLE_HEAD = ["User", "Amount", "Date", "Status", "Action"]

const orders = ({ orders }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state
    const router = useRouter()
    useEffect(() => {
        if (!checkIfUserIsAdmin(user)) {
            router.push("/")
        }
    }, [])

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
                                Recent Transactions
                            </Typography>
                            <Typography
                                color='gray'
                                className='mt-1 font-normal'
                            >
                                These are details about the last transactions
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
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
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
                            {orders.map(
                                (
                                    {
                                        _id,
                                        userID,
                                        totalPrice,
                                        status,
                                        createdAt,
                                    },
                                    index
                                ) => {
                                    const isLast = index === orders.length - 1
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50"

                                    return (
                                        <tr key={userID}>
                                            <td className={classes}>
                                                <div className='flex items-center gap-3'>
                                                    <Typography
                                                        variant='small'
                                                        color='blue-gray'
                                                        className='font-bold'
                                                    >
                                                        {userID}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant='small'
                                                    color='blue-gray'
                                                    className='font-normal'
                                                >
                                                    {totalPrice.toLocaleString(
                                                        "de-DE"
                                                    )}
                                                    đ
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant='small'
                                                    color='blue-gray'
                                                    className='font-normal'
                                                >
                                                    {new Date(
                                                        createdAt
                                                    ).toLocaleString("id-ID")}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className='w-max'>
                                                    <Chip
                                                        size='sm'
                                                        variant='ghost'
                                                        value={
                                                            status === "paid"
                                                                ? "Giao hàng thành công"
                                                                : status ===
                                                                  "delivering"
                                                                ? "Đang giao hàng"
                                                                : "Đã đặt hàng"
                                                        }
                                                        color={
                                                            status === "paid"
                                                                ? "green"
                                                                : status ===
                                                                  "delivering"
                                                                ? "blue"
                                                                : "amber"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Link
                                                    href={`/admin/orders/${_id}`}
                                                >
                                                    <Tooltip content='Edit'>
                                                        <IconButton
                                                            variant='text'
                                                            color='blue-gray'
                                                        >
                                                            <PencilIcon className='h-4 w-4' />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
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

export default orders
