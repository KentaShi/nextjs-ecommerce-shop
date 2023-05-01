import React from "react";
import { getData } from "@/utils/fetchData";

const ProductDetail = ({ product }) => {
    const { name, description, price, images } = product;
    return (
        <div className='flex'>
            <div className='flex-1'>
                <img
                    width={450}
                    height={450}
                    className='object-cover'
                    src={images[0].url}
                />
            </div>
            <div className='flex-1'>
                <p>{name}</p>
                <div>
                    <p>{price}</p>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await getData("product");

    // Get the paths we want to pre-render based on posts
    const paths = res.products.map((product) => ({
        params: { id: product._id },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
    const res = await getData(`product/${id}`);
    return { props: { product: res.product } };
}

export default ProductDetail;
