import Image from "next/image";
import { Inter } from "next/font/google";
import Product from "@/components/Product";
import connectDB from "@/utils/connectDB";

export default function Home({ products }) {
    return (
        <div>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export const getServerSideProps = async () => {
    await connectDB();
    const products = [
        {
            id: 1,
            name: "iphone 14 promax",
            price: 1000,
        },
        { id: 2, name: "iphone 13 promax", price: 1200 },
    ];

    return { props: { products } };
};
