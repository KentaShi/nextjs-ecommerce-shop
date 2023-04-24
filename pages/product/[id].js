import React from "react";

const ProductDetail = ({ product }) => {
    console.log(product);
    const { name, price } = product;
    return (
        <div>
            <p>{name}</p>
            <div>
                <p>price: {price}</p>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const product = {
        id: 1,
        name: "iphone 14 promax",
        price: 1000,
    };

    return { props: { product } };
};

export default ProductDetail;
