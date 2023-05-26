import DeniedAccess from "@/components/DeniedAccess"
import { DataContext } from "@/store/globalState"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import { getData } from "@/utils/fetchData"
import Head from "next/head"
import React, { useContext } from "react"

const ProductDetail = ({ product }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    if (!checkIfUserIsAdmin(user)) {
        return <DeniedAccess />
    }

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <div>productDetail: {product._id}</div>
        </>
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
