import { DataContext } from "@/store/globalState"
import { deleteData, updateData } from "@/utils/fetchData"
import {
    PencilIcon,
    TrashIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/solid"
import {
    Button,
    Chip,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

const OrderItem = ({ classes, order }) => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isPaid, setIsPaid] = useState(false)

    const { _id, phone, status, totalPrice, createdAt } = order

    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { token },
    } = state

    const data = ["delivering", "paid"]

    const router = useRouter()

    const handleConfirm = (e) => {
        e.preventDefault()

        updateData(`order/${_id}`, { status: data[0] }, token).then((res) => {
            if (res.err)
                return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                })
            //console.log(res)
            return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
            })
        })
        setIsConfirmed(true)
        router.reload()
    }

    const handleDelete = () => {
        deleteData(`order/${_id}`, token).then((res) => {
            if (res.err)
                return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                })
            return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
            })
        })
        router.reload()
    }

    const handlePaid = () => {
        updateData(`order/${_id}`, { status: data[1] }, token).then((res) => {
            if (res.err)
                return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                })
            //console.log(res)
            return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
            })
        })
        setIsPaid(true)
        router.reload()
    }

    useEffect(() => {
        if (status !== "pending") {
            setIsConfirmed(true)
            if (status === "paid") {
                setIsPaid(true)
            }
        }
    }, [status])
    return (
        <tr>
            <td className={classes}>
                <div className='flex items-center gap-3'>
                    <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-bold'
                    >
                        {phone}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {totalPrice.toLocaleString("de-DE")}đ
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {new Date(createdAt).toLocaleString("id-ID")}
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
                                : status === "delivering"
                                ? "Đang giao hàng"
                                : "Đã đặt hàng"
                        }
                        color={
                            status === "paid"
                                ? "green"
                                : status === "delivering"
                                ? "blue"
                                : "amber"
                        }
                    />
                </div>
            </td>

            <td className={classes}>
                <Button
                    onClick={handleConfirm}
                    color='orange'
                    type='button'
                    disabled={isConfirmed}
                >
                    Xác Nhận
                </Button>
            </td>
            <td className={`${classes} ${isConfirmed ? "" : "hidden"}`}>
                <Button
                    onClick={handlePaid}
                    color='green'
                    type='button'
                    disabled={isPaid}
                >
                    Đã thanh toán
                </Button>
            </td>
            <td className={classes}>
                <Link href={`/admin/orders/${_id}`}>
                    <Tooltip content='Chi Tiết'>
                        <IconButton variant='text' color='blue-gray'>
                            <DocumentTextIcon className='h-4 w-4' />
                        </IconButton>
                    </Tooltip>
                </Link>
            </td>
            <td className={classes}>
                <Tooltip content='Xóa'>
                    <IconButton
                        variant='text'
                        color='blue-gray'
                        onClick={handleDelete}
                    >
                        <TrashIcon className='h-4 w-4' />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default OrderItem
