import Product from "@/components/Product"
import admin from "@/middleware/admin"
import { getData } from "@/utils/fetchData"
import React, { useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import Router, { useRouter } from "next/router"

const products = ({ products }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state
    const router = useRouter()
    useEffect(() => {
        if (!checkIfUserIsAdmin(user)) {
            router.push("/")
        }
    }, [])
    return (
        <div>
            <div className='grid grid-cols-4 gap-4 justify-items-center content-start max-w-[880px]'>
                {!products ? (
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
export default products

export const getServerSideProps = async () => {
    const res = await getData("product")
    return { props: { products: res.products, result: res.result } }
}
