import React, { useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { DataContext } from "@/store/globalState";

const CartItem = ({ product, qty }) => {
    const [quantity, setQuantity] = useState(qty);
    const { _id, name, price, images, inStock } = product;
    const [state, dispatch] = useContext(DataContext);
    const {
        cart: { products, totalQty, totalPrice },
    } = state;

    const handleDecrease = (e) => {
        e.preventDefault();

        setQuantity((prev) => {
            if (prev - 1 < 1) return 1;
            return prev - 1;
        });

        const newProducts = [...products];
        newProducts.forEach((item) => {
            if (item.product._id === _id) item.qty -= 1;
        });

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: newProducts,
                totalQty: totalQty - 1,
                totalPrice: totalPrice - product.price,
            },
        });
    };
    const handleIncrease = (e) => {
        e.preventDefault();

        setQuantity((prev) => prev + 1);
    };
    const handleDelete = (e) => {
        e.preventDefault();
    };

    return (
        <div className='rounded-lg flex flex-row bg-teal-50 mt-6 p-6'>
            <div className='flex-[0.5] flex justify-center items-center'>
                <img
                    style={{ height: "120px" }}
                    src={images[0].url}
                    alt=''
                    className='w-40 object-cover rounded-lg'
                />
            </div>
            <div className='flex flex-1 flex-col justify-between'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <h2 className='text-lg font-bold text-teal-800'>
                            {name}
                        </h2>
                        <p className='text-red-300 font-normal text-sm italic'>
                            In Stock: {inStock}
                        </p>
                    </div>
                    <div>
                        <button
                            disabled={quantity === 1 ? true : false}
                            onClick={handleDecrease}
                            className='px-3 border-y-2 border-l-2 border-teal-200 bg-white hover:bg-gray-200 rounded-bl rounded-tl cursor-pointer'
                        >
                            -
                        </button>
                        <span className='px-3 py-1 border-2 border-teal-200 bg-white'>
                            {quantity}
                        </span>
                        <button
                            disabled={quantity === inStock ? true : false}
                            onClick={handleIncrease}
                            className='px-3 border-y-2 border-r-2 border-teal-200 bg-white hover:bg-gray-200 rounded-br rounded-tr cursor-pointer'
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <span className='text-red-500 text-lg font-semibold'>
                        ${price}
                    </span>
                    <button
                        type='button'
                        onClick={handleDelete}
                        className='bg-red-300 rounded p-2 text-white hover:bg-red-400'
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
