import { DataContext } from "@/store/globalState"
import { updateData } from "@/utils/fetchData"
import { PencilIcon } from "@heroicons/react/24/solid"
import {
    Button,
    Chip,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"

const OrderItem = ({ classes, _id, phone, totalPrice, _status, createdAt }) => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [status, setStatus] = useState(_status)

    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { token },
    } = state

    const data = { status: "delivering" }

    const handleConfirm = (e) => {
        e.preventDefault()

        updateData(`order/${_id}`, data, token).then((res) => {
            if (res.err)
                return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                })
            setStatus(res.order.status)
            return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
            })
        })
        setIsConfirmed(true)
    }

    useEffect(() => {
        if (status !== "pending") {
            setIsConfirmed(true)
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
                <Link href={`/admin/orders/${_id}`}>
                    <Tooltip content='Chi Tiết'>
                        <IconButton variant='text' color='blue-gray'>
                            <PencilIcon className='h-4 w-4' />
                        </IconButton>
                    </Tooltip>
                </Link>
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
        </tr>
    )
}

export default OrderItem
