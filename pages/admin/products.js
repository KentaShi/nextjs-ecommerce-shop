import Product from "@/components/Product"
import { getData } from "@/utils/fetchData"
import React from "react"

const products = ({ products }) => {
    return (
        <div>
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
    )
}

export const getServerSideProps = async () => {
    const res = await getData("product")
    return { props: { products: res.products, result: res.result } }
}

export default products
