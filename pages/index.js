import Image from "next/image"
import Product from "@/components/Product"
import connectDB from "@/utils/connectDB"
import { getData } from "@/utils/fetchData"
import { useState } from "react"
import Head from "next/head"

export default function Home(props) {
    const [products, setProducts] = useState(props.products)
    return (
        <>
            <Head>
                <title>Trang Chủ</title>
            </Head>

            <div className='flex flex-col justify-center items-center'>
                <div>
                    <p className='text-lg font-semibold text-coca-darkest mb-4'>
                        Thức Uống
                    </p>
                </div>
                <div className='grid grid-cols-4 gap-4 justify-items-center content-start max-w-[880px]'>
                    {products.length === 0 ? (
                        <h2>No Products</h2>
                    ) : (
                        products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async () => {
    await connectDB()
    const res = await getData("product")
    return { props: { products: res.products, result: res.result } }
}
