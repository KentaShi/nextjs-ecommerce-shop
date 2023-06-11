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
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Fragment, useContext, useEffect, useState } from "react"

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

        const currentTIme = new Date()

        updateData(
            "order/change-status",
            { id: _id, status: { name: data[0], time: currentTIme } },
            token
        ).then((res) => {
            if (res.err)
                return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                })
            setIsConfirmed(true)
            return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
            })
        })

        router.replace(router.asPath)
    }

    const handleDelete = async () => {
        await deleteData(`order/${_id}`, token).then((res) => {
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

    const handlePaid = async () => {
        const currentTIme = new Date()
        await updateData(
            "order/change-status",
            { id: _id, status: { name: data[1], time: currentTIme } },
            token
        ).then(async (res) => {
            if (res.err)
                return dispatch({
                    type: "NOTIFY",
                    payload: { error: res.err },
                })
            //console.log(res)
            await res.order.products.map(async (item) => {
                await updateData(
                    `product/${item.product._id}`,
                    { sold: item.product.sold + item.qty },
                    token
                ).then((res) => {
                    if (res.err)
                        return dispatch({
                            type: "NOTIFY",
                            payload: { error: res.err },
                        })
                })
            })
            setIsPaid(true)
            return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
            })
        })

        router.replace(router.asPath)
    }

    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] =
        useState(false)
    const handleOpenConfirmDelete = () => {
        setOpenDialogConfirmDelete(!openDialogConfirmDelete)
    }

    useEffect(() => {
        if (status[status.length - 1]?.statusName !== "pending") {
            setIsConfirmed(true)
            if (status[status.length - 1]?.statusName === "paid") {
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
                            status[status.length - 1]?.statusName === "paid"
                                ? "Giao hàng thành công"
                                : status[status.length - 1]?.statusName ===
                                  "delivering"
                                ? "Đang giao hàng"
                                : "Đã đặt hàng"
                        }
                        color={
                            status[status.length - 1]?.statusName === "paid"
                                ? "green"
                                : status[status.length - 1]?.statusName ===
                                  "delivering"
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
            {isConfirmed ? (
                <td className={`${classes}`}>
                    <Button
                        onClick={handlePaid}
                        color='green'
                        type='button'
                        disabled={isPaid}
                    >
                        Đã thanh toán
                    </Button>
                </td>
            ) : (
                <td></td>
            )}

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
                    <Fragment>
                        <Button
                            onClick={handleOpenConfirmDelete}
                            className='bg-red-300 rounded p-2 text-white hover:bg-red-400 hover:shadow-coca-light'
                        >
                            <TrashIcon className='h-4 w-4' />
                        </Button>
                        <Dialog
                            open={openDialogConfirmDelete}
                            handler={handleOpenConfirmDelete}
                        >
                            <DialogHeader>{name}</DialogHeader>
                            <DialogBody divider>Xóa đơn hàng này?</DialogBody>
                            <DialogFooter>
                                <Button
                                    variant='text'
                                    color='red'
                                    onClick={handleOpenConfirmDelete}
                                    className='mr-1'
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    variant='gradient'
                                    color='green'
                                    onClick={handleDelete}
                                >
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </Fragment>
                </Tooltip>
            </td>
        </tr>
    )
}

export default OrderItem
