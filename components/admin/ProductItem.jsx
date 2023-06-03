import {
    Avatar,
    Button,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Option,
    Select,
    Textarea,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React, { Fragment, useContext, useState } from "react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { deleteData, updateData } from "@/utils/fetchData"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import { XMarkIcon } from "@heroicons/react/24/outline"

const ProductItem = ({ product, classes }) => {
    const { _id, name, price, images, description, category, sold } = product
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    const router = useRouter()

    const initialStateUpdateProduct = {
        name: name,
        description: description,
        price: price,
        urlImg: images[0].url || "",
        category: category,
    }

    const [updateProduct, setUpdateProduct] = useState(
        initialStateUpdateProduct
    )
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUpdateProduct({ ...updateProduct, [name]: value })
    }
    const handleChangeCategory = (e) => {
        setUpdateProduct({ ...updateProduct, category: e })
    }

    const handleUpdateProduct = async () => {
        await updateData(`product/${_id}`, updateProduct, token).then((res) => {
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
        router.replace(router.asPath)
    }

    const handleDelete = async () => {
        await deleteData(`product/${_id}`, token).then((res) => {
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
        router.replace(router.asPath)
    }

    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] =
        useState(false)
    const [openDialogUpdateForm, setOpenDialogUpdateForm] = useState(false)
    const handleOpenConfirmDelete = () => {
        setOpenDialogConfirmDelete(!openDialogConfirmDelete)
    }

    const handleOpenUpdateForm = () => {
        setOpenDialogUpdateForm(!openDialogUpdateForm)
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
            <td className={classes} width={500}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {description}
                </Typography>
            </td>
            <td className={classes}>
                <Tooltip content='Chỉnh sửa'>
                    <Fragment>
                        <IconButton
                            onClick={handleOpenUpdateForm}
                            variant='text'
                            color='blue-gray'
                        >
                            <PencilIcon className='h-4 w-4' />
                        </IconButton>
                        <Dialog
                            open={openDialogUpdateForm}
                            handler={handleOpenUpdateForm}
                        >
                            <div className='flex items-center justify-between'>
                                <DialogHeader>Cập Nhật Sản Phẩm</DialogHeader>
                                <XMarkIcon
                                    className='mr-3 h-5 w-5'
                                    onClick={handleOpenUpdateForm}
                                />
                            </div>
                            <DialogBody divider>
                                <div className='grid gap-6'>
                                    <Input
                                        value={updateProduct.name}
                                        onChange={handleChangeInput}
                                        name='name'
                                        label='Tên Sản Phẩm'
                                    />
                                    <Input
                                        value={updateProduct.price}
                                        onChange={handleChangeInput}
                                        name='price'
                                        label='Giá'
                                    />
                                    <Textarea
                                        value={updateProduct.description}
                                        onChange={handleChangeInput}
                                        name='description'
                                        label='Mô Tả'
                                    />
                                    <Input
                                        value={updateProduct.urlImg}
                                        onChange={handleChangeInput}
                                        name='urlImg'
                                        label='URL Hình Ảnh'
                                    />
                                    <Select
                                        name='category'
                                        onChange={handleChangeCategory}
                                        value={updateProduct.category}
                                        label='Phân Loại'
                                    >
                                        <Option value='drink'>Thức Uống</Option>
                                        <Option value='food'>Ăn Vặt</Option>
                                    </Select>
                                </div>
                            </DialogBody>
                            <DialogFooter className='space-x-2'>
                                <Button
                                    onClick={handleOpenUpdateForm}
                                    variant='outlined'
                                    color='red'
                                >
                                    Hủy
                                </Button>
                                <Button
                                    onClick={handleUpdateProduct}
                                    variant='gradient'
                                    color='green'
                                >
                                    Cập Nhật
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </Fragment>
                </Tooltip>
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

export default ProductItem
