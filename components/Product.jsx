import Link from "next/link"
import React, { useContext } from "react"

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react"

import { DataContext } from "@/store/globalState"

const Product = ({ product }) => {
    const { _id, name, price, images } = product

    const [state, dispatch] = useContext(DataContext)
    const {
        cart: { products, totalQty, totalPrice },
    } = state

    const addToCart = (e) => {
        e.preventDefault()

        const checkProductInCart = products.find((item) => {
            return item.product._id === _id
        })

        if (checkProductInCart) {
            return dispatch({
                type: "NOTIFY",
                payload: { error: `${name} đã có trong giỏ hàng!` },
            })
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: [...products, { product, qty: 1 }],
                totalQty: totalQty + 1,
                totalPrice: totalPrice + product.price,
            },
        })
        dispatch({
            type: "NOTIFY",
            payload: { success: `Đã thêm ${name} vào giỏ hàng!` },
        })
    }
    return (
        <div className='w-52'>
            <Card className=''>
                <Link href={`/product/${_id}`}>
                    <img
                        className='p-1 rounded-xl'
                        style={{ height: "auto", maxWidth: "100%" }}
                        src={images[0].url}
                        alt='img-blur-shadow'
                    />
                    <CardBody className='text-center'>
                        <Typography
                            variant='h6'
                            className='mb-2 text-coca-darkest'
                        >
                            {name}
                        </Typography>
                    </CardBody>
                </Link>
                <CardFooter
                    divider
                    className='flex items-center justify-between py-3'
                >
                    <Typography variant='small'>
                        {price.toLocaleString("de-DE")}đ
                    </Typography>
                    <Typography
                        variant='small'
                        color='gray'
                        className='flex gap-1 cursor-pointer'
                    >
                        <svg
                            onClick={addToCart}
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 group-hover:opacity-50 opacity-70'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='black'
                        >
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='1.5'
                                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                            />
                        </svg>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Product
