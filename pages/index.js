import Image from "next/image";
import { Inter } from "next/font/google";
import Product from "@/components/Product";

const inter = Inter({ subsets: ["latin"] });

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
