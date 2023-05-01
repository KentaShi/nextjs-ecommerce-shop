import Link from "next/link";
import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

const Product = ({ product: { _id, name, price, description, images } }) => {
    return (
        <div className='my-10'>
            <Card className='w-96'>
                <Link href={`/product/${_id}`}>
                    <CardHeader color='blue' className='relative h-56'>
                        <img
                            src={images[0].url}
                            alt='img-blur-shadow'
                            className='h-full w-full'
                        />
                    </CardHeader>
                    <CardBody className='text-center'>
                        <Typography variant='h5' className='mb-2'>
                            {name}
                        </Typography>
                    </CardBody>
                </Link>
                <CardFooter
                    divider
                    className='flex items-center justify-between py-3'
                >
                    <Typography variant='small'>${price}</Typography>
                    <Typography
                        variant='small'
                        color='gray'
                        className='flex gap-1'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            class='h-6 w-6 group-hover:opacity-50 opacity-70'
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
    );
};

export default Product;
