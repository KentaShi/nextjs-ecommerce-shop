import {
    Avatar,
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
import React, { Fragment, useContext, useState } from "react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { deleteData } from "@/utils/fetchData"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"

const ProductItem = ({ product, classes }) => {
    const { _id, name, price, images, category, sold } = product
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    const router = useRouter()

    const handleDelete = () => {
        deleteData(`product/${_id}`, token).then((res) => {
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
    const [openDialog, setOpenDialog] = useState(false)
    const handleOpenDialog = () => {
        setOpenDialog(!openDialog)
    }
    return (
        <tr>
            <td className={classes}>
                <div className='flex items-center gap-3'>
                    <Avatar
                        src={images[0].url}
                        alt={name}
                        size='md'
                        className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
                    />
                    <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-bold'
                    >
                        {name}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {price.toLocaleString("de-DE")}đ
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {category}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {sold}
                </Typography>
            </td>
            <td className={classes}>
                <Link href={`/admin/products/${_id}`}>
                    <Tooltip content='Chỉnh sửa'>
                        <IconButton variant='text' color='blue-gray'>
                            <PencilIcon className='h-4 w-4' />
                        </IconButton>
                    </Tooltip>
                </Link>
            </td>
            <td className={classes}>
                <Tooltip content='Xóa'>
                    <Fragment>
                        <Button
                            onClick={handleOpenDialog}
                            className='bg-red-300 rounded p-2 text-white hover:bg-red-400 hover:shadow-coca-light'
                        >
                            <TrashIcon className='h-4 w-4' />
                        </Button>
                        <Dialog open={openDialog} handler={handleOpenDialog}>
                            <DialogHeader>{name}</DialogHeader>
                            <DialogBody divider>
                                Xóa{" "}
                                <span className='italic text-coca-medium-dark font-bold'>
                                    {name}
                                </span>
                                ?
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant='text'
                                    color='red'
                                    onClick={handleOpenDialog}
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

export default ProductItem
