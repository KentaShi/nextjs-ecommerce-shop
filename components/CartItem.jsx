import React, { Fragment, useContext, useState } from "react"
import { AiOutlineDelete } from "react-icons/ai"

import { DataContext } from "@/store/globalState"
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react"

const CartItem = ({ product, qty }) => {
    const [quantity, setQuantity] = useState(qty)
    const { _id, name, price, images } = product
    const [state, dispatch] = useContext(DataContext)
    const {
        cart: { products, totalQty, totalPrice },
    } = state

    const [openDialog, setOpenDialog] = useState(false)

    const handleDecrease = (e) => {
        e.preventDefault()

        setQuantity((prev) => {
            if (prev - 1 < 1) return 1
            return prev - 1
        })

        const newProducts = [...products]
        newProducts.forEach((item) => {
            if (item.product._id === _id) item.qty -= 1
        })

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: newProducts,
                totalQty: totalQty - 1,
                totalPrice: totalPrice - product.price,
            },
        })
    }
    const handleIncrease = (e) => {
        e.preventDefault()

        setQuantity((prev) => prev + 1)

        const newProducts = [...products]
        newProducts.forEach((item) => {
            if (item.product._id === _id) item.qty += 1
        })

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: newProducts,
                totalQty: totalQty + 1,
                totalPrice: totalPrice + product.price,
            },
        })
    }
    const handleDelete = (e) => {
        e.preventDefault()

        const filterNoDelete = products.filter(
            (item) => item.product._id !== _id
        )
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: filterNoDelete,
                totalQty: totalQty - quantity,
                totalPrice: totalPrice - product.price * quantity,
            },
        })
        setOpenDialog(!openDialog)
    }

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog)
    }

    return (
        <div className='rounded-lg flex flex-row shadow-lg shadow-coca-lightest mt-6 p-6'>
            <div className='flex-[0.5] flex justify-center items-center'>
                <img
                    style={{ height: "120px" }}
                    src={images[0].url}
                    alt=''
                    className='object-cover rounded-lg'
                />
            </div>
            <div className='flex flex-1 flex-col justify-between'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h2 className='text-lg font-bold text-coca-darkest'>
                            {name}
                        </h2>
                    </div>
                    <div>
                        <button
                            disabled={quantity === 1 ? true : false}
                            onClick={handleDecrease}
                            className='px-3 border-y-2 border-l-2 border-coca-darkest bg-white hover:bg-gray-200 rounded-bl rounded-tl cursor-pointer'
                        >
                            -
                        </button>
                        <span className='px-3 py-1 border-2 border-coca-darkest bg-white'>
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrease}
                            className='px-3 border-y-2 border-r-2 border-coca-darkest bg-white hover:bg-gray-200 rounded-br rounded-tr cursor-pointer'
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-coca-medium-dark text-base font-medium'>
                        {price.toLocaleString("de-DE")}đ
                    </span>
                    <Fragment>
                        <Button
                            onClick={handleOpenDialog}
                            className='bg-red-300 rounded p-2 text-white hover:bg-red-400 hover:shadow-coca-light'
                        >
                            <AiOutlineDelete />
                        </Button>
                        <Dialog open={openDialog} handler={handleOpenDialog}>
                            <DialogHeader>{name}</DialogHeader>
                            <DialogBody divider>
                                Do you want to delete this item?
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
                </div>
            </div>
        </div>
    )
}

export default CartItem
