import React, { useState } from "react";
import { getData } from "@/utils/fetchData";

const ProductDetail = ({ product }) => {
    const { name, description, price, images } = product;
    const [indexImg, setIndexImg] = useState(0);
    return (
        <div className='max-w-7xl mx-auto px-4 mt-6'>
            <div className='flex flex-row -mx-4'>
                <div className='flex-1 px-4'>
                    <div>
                        <img
                            style={{ height: "350px", width: "100%" }}
                            className='border-2 object-cover'
                            src={images[indexImg].url}
                            alt=''
                        />
                        <div className='flex flex-row'>
                            {images.map((image, index) => (
                                <img
                                    onClick={() => setIndexImg(index)}
                                    className={`border-2 object-cover ${
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
                <div className='flex-1 px-4'>
                    <h2 className='mb-2 leading-tight tracking-tight font-bold text-teal-900 text-3xl'>
                        {name}
                    </h2>
                    <div className='rounded-lg bg-white flex py-2 px-3 w-[72px] h-[52px]'>
                        <span className='mr-1 mt-1 text-red-300'>$</span>
                        <span className='font-bold text-red-300 text-3xl'>
                            {price}
                        </span>
                    </div>
                    <p className='text-teal-800'>{description}</p>
                    <div className='flex py-4 justify-start items-center'>
                        <div className='mr-5'>
                            <h3 className='my-2'>Qty:</h3>
                            <span className='px-3 py-1 border-y-2 border-l-2 rounded-bl rounded-tl cursor-pointer'>
                                -
                            </span>
                            <span className='px-3 py-1 border-2'>{1}</span>
                            <span className='px-3 py-1 border-y-2 border-r-2 rounded-br rounded-tr cursor-pointer'>
                                +
                            </span>
                        </div>
                        <button className='h-14 px-6 py-2 bg-teal-400 hover:bg-teal-500 font-semibold rounded-xl'>
                            Add to Cart
                        </button>
                    </div>
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
