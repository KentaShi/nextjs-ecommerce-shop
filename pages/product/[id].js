import React, { useState, useContext, useEffect } from "react"
import { getData } from "@/utils/fetchData"
import { DataContext } from "@/store/globalState"
import Head from "next/head"
import { useRouter } from "next/router"
import { Breadcrumbs } from "@material-tailwind/react"
import Link from "next/link"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"

const ProductDetail = ({ product }) => {
    const { name, description, price, images } = product
    const [indexImg, setIndexImg] = useState(0)
    const [qty, setQty] = useState(1)

    const router = useRouter()

    const [state, dispatch] = useContext(DataContext)
    const {
        cart: { products, totalQty, totalPrice },
    } = state
    const {
        auth: { user },
    } = state

    useEffect(() => {
        if (checkIfUserIsAdmin(user)) {
            router.push("/admin")
        }
    }, [])

    const handleMinus = (e) => {
        e.preventDefault()

        setQty((prev) => {
            if (prev - 1 < 1) return 1
            return prev - 1
        })
    }

    const handleAdd = (e) => {
        e.preventDefault()

        setQty((prev) => prev + 1)
    }

    const addToCart = (e) => {
        e.preventDefault()

        const checkProductInCart = products.find((item) => {
            return item.product._id === product._id
        })

        if (checkProductInCart) {
            return dispatch({
                type: "NOTIFY",
                payload: {
                    error: `${name} đã có trong giỏ hàng!`,
                },
            })
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: [...products, { product, qty: qty }],
                totalQty: totalQty + qty,
                totalPrice: totalPrice + product.price * qty,
            },
        })
        dispatch({
            type: "NOTIFY",
            payload: { success: `Đã thêm ${name} vào giỏ hàng!` },
        })
    }
    return (
        <div className='max-w-7xl xl:w-2/3 mx-auto px-4 mt-6'>
            <Head>
                <title>{name}</title>
            </Head>
            <div className='flex justify-center items-center'>
                <div className='w-2/4'>
                    <Breadcrumbs>
                        <Link className='opacity-60' href={"/"}>
                            Trang Chủ
                        </Link>
                        <span>{name}</span>
                    </Breadcrumbs>
                </div>
            </div>
            <div className='flex flex-col xl:flex-row shadow-lg rounded-lg p-3'>
                <div className='flex-1 px-4'>
                    <div>
                        <img
                            style={{ height: "auto", maxWidth: "100%" }}
                            className='border-2 object-cover rounded-lg mb-1'
                            src={images[indexImg].url}
                            alt=''
                        />
                        <div className='hidden xl:flex xl:flex-row'>
                            {images.map((image, index) => (
                                <img
                                    onClick={() => setIndexImg(index)}
                                    className={`border-2 object-cover rounded-lg ${
                                        index === indexImg
                                            ? "border-teal-600"
                                            : ""
                                    }`}
                                    key={index}
                                    src={image.url}
                                    alt={image.url}
                                    width='20%'
                                    style={{ height: "80px" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 px-4 justify-between'>
                    <div className='flex flex-col justify-start'>
                        <h2 className='mb-2 leading-tight tracking-tight font-bold text-coca-darkest text-2xl xl:text-xl'>
                            {name}
                        </h2>
                        <div className='flex flex-row justify-between'>
                            <div className='rounded-lg bg-white flex py-2 w-[72px] h-[52px]'>
                                <span className='font-medium text-coca-medium text-lg'>
                                    {price.toLocaleString("de-DE")}
                                </span>
                                <span className='mr-1 mt-1 text-coca-medium'>
                                    đ
                                </span>
                            </div>
                            <div className='mr-5'>
                                <span
                                    className='px-3 py-1 border-y-2 border-l-2 rounded-bl rounded-tl cursor-pointer'
                                    onClick={handleMinus}
                                >
                                    -
                                </span>
                                <span className='px-3 py-1 border-2'>
                                    {qty}
                                </span>
                                <span
                                    className='px-3 py-1 border-y-2 border-r-2 rounded-br rounded-tr cursor-pointer'
                                    onClick={handleAdd}
                                >
                                    +
                                </span>
                            </div>
                        </div>

                        <p className='text-coca-dark'>{description}</p>
                    </div>
                    <button
                        onClick={addToCart}
                        className='h-14 px-6 py-2 mt-2 bg-coca-medium text-coca-lightest-95 hover:bg-coca-medium-dark font-semibold rounded-full'
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await getData("product")

    // Get the paths we want to pre-render based on posts
    const paths = res.products.map((product) => ({
        params: { id: product._id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params: { id } }) {
    const res = await getData(`product/${id}`)
    return { props: { product: res.product } }
}

export default ProductDetail
