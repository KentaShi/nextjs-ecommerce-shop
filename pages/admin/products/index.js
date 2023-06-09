import Product from "@/components/Product"
import { getData, postData } from "@/utils/fetchData"
import React, { useContext, useEffect, useState } from "react"
import { DataContext } from "@/store/globalState"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import Router, { useRouter } from "next/router"

import {
    ArrowDownTrayIcon,
    PlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
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
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Select,
    Option,
} from "@material-tailwind/react"
import ProductItem from "@/components/admin/ProductItem"

import DeniedAccess from "@/components/DeniedAccess"
import Head from "next/head"

const TABLE_HEAD = [
    "Tên sản phảm",
    "Đơn giá",
    "Phân loại",
    "Đã bán",
    "Mô tả",
    "",
]

const Products = ({ products, result }) => {
    const [state, dispatch] = useContext(DataContext)
    const [openAddNew, setOpenAddNew] = useState(false)
    const {
        auth: { user, token },
    } = state

    const router = useRouter()

    const initialState = {
        name: "",
        description: "",
        price: "",
        urlImg: "",
        category: "",
    }

    const [newProduct, setNewProduct] = useState(initialState)
    const { name, description, price, urlImg, category } = newProduct
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setNewProduct({ ...newProduct, [name]: value })
    }
    const handleChangeCategory = (e) => {
        setNewProduct({ ...newProduct, category: e })
    }

    if (!checkIfUserIsAdmin(user)) {
        return <DeniedAccess />
    }

    const handleOpenAddNew = () => {
        setOpenAddNew(!openAddNew)
    }
    const handleAddNew = async () => {
        //console.log("new product", newProduct)

        await postData("product", newProduct, token)
            .then((res) => {
                if (res.err) {
                    return dispatch({
                        type: "NOTIFY",
                        payload: { error: res.err },
                    })
                }
                dispatch({ type: "NOTIFY", payload: { success: res.msg } })
                setNewProduct({})
                handleOpenAddNew()
                router.replace(router.asPath)
            })
            .catch((err) => {
                return dispatch({ type: "NOTIFY", payload: { error: err } })
            })
    }
    return (
        <>
            <Head>
                <title>Danh sách sản phẩm</title>
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
                                Danh sách Sản phẩm
                            </Typography>
                            <Typography
                                color='gray'
                                className='mt-1 font-normal'
                            >
                                Tổng: {result} sản phẩm
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

                            <React.Fragment>
                                <Button
                                    onClick={handleOpenAddNew}
                                    className='flex items-center gap-3'
                                    color='blue'
                                    size='sm'
                                >
                                    <PlusIcon
                                        strokeWidth={2}
                                        className='h-4 w-4'
                                    />{" "}
                                    Thêm Sản Phẩm
                                </Button>
                                <Dialog
                                    open={openAddNew}
                                    handler={handleOpenAddNew}
                                >
                                    <div className='flex items-center justify-between'>
                                        <DialogHeader>
                                            Thêm Sản Phẩm Mới
                                        </DialogHeader>
                                        <XMarkIcon
                                            className='mr-3 h-5 w-5'
                                            onClick={handleOpenAddNew}
                                        />
                                    </div>
                                    <DialogBody divider>
                                        <div className='grid gap-6'>
                                            <Input
                                                value={name}
                                                onChange={handleChangeInput}
                                                name='name'
                                                label='Tên Sản Phẩm'
                                            />
                                            <Input
                                                value={price}
                                                onChange={handleChangeInput}
                                                name='price'
                                                label='Giá'
                                            />
                                            <Input
                                                value={description}
                                                onChange={handleChangeInput}
                                                name='description'
                                                label='Mô Tả'
                                            />
                                            <Input
                                                value={urlImg}
                                                onChange={handleChangeInput}
                                                name='urlImg'
                                                label='URL Hình Ảnh'
                                            />
                                            <Select
                                                name='category'
                                                onChange={handleChangeCategory}
                                                value={category}
                                                label='Phân Loại'
                                            >
                                                <Option value='drink'>
                                                    Thức Uống
                                                </Option>
                                                <Option value='food'>
                                                    Ăn Vặt
                                                </Option>
                                            </Select>
                                        </div>
                                    </DialogBody>
                                    <DialogFooter className='space-x-2'>
                                        <Button
                                            variant='outlined'
                                            color='red'
                                            onClick={handleOpenAddNew}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            variant='gradient'
                                            color='green'
                                            onClick={handleAddNew}
                                        >
                                            Thêm
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                            </React.Fragment>
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
                                        colSpan={
                                            index === TABLE_HEAD.length - 1
                                                ? 2
                                                : 1
                                        }
                                        key={index}
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
                            {products.map((product, index) => {
                                const isLast = index === products.length - 1
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50"

                                return (
                                    <ProductItem
                                        key={index}
                                        product={product}
                                        classes={classes}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
                    <Button variant='outlined' color='blue-gray' size='sm'>
                        Previous
                    </Button>
                    <div className='flex items-center gap-2'>
                        <IconButton
                            variant='outlined'
                            color='blue-gray'
                            size='sm'
                        >
                            1
                        </IconButton>
                        <IconButton variant='text' color='blue-gray' size='sm'>
                            2
                        </IconButton>
                        <IconButton variant='text' color='blue-gray' size='sm'>
                            3
                        </IconButton>
                        <IconButton variant='text' color='blue-gray' size='sm'>
                            ...
                        </IconButton>
                        <IconButton variant='text' color='blue-gray' size='sm'>
                            8
                        </IconButton>
                        <IconButton variant='text' color='blue-gray' size='sm'>
                            9
                        </IconButton>
                        <IconButton variant='text' color='blue-gray' size='sm'>
                            10
                        </IconButton>
                    </div>
                    <Button variant='outlined' color='blue-gray' size='sm'>
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
export default Products

export const getServerSideProps = async () => {
    const res = await getData("product")
    return { props: { products: res.products, result: res.result } }
}
