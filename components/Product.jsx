import Link from "next/link";
import React from "react";

const Product = ({ product: { id, name, price } }) => {
    return (
        <div className='container'>
            <Link href={`/product/${id}`}>
                <div>
                    <p>{name}</p>
                    <div>
                        <span>Price:{price}$</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Product;
