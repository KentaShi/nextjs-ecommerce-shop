import React from "react";

const CartItem = ({ product, qty }) => {
    const { name, price, images } = product;
    return (
        <div className='rounded-lg flex flex-row bg-teal-50 mt-6 py-2 px-2'>
            <div className='flex-[0.5] flex justify-center items-center'>
                <img
                    style={{ height: "120px" }}
                    src={images[0].url}
                    alt=''
                    className='w-40 object-cover rounded-lg'
                />
            </div>
            <div className='flex flex-1 flex-col'>
                <div>
                    <h2 className='text-lg font-bold text-teal-800'>{name}</h2>
                    <p>size</p>
                </div>
                <div>
                    <span className='px-3 py-1 border-y-2 border-l-2 rounded-bl rounded-tl cursor-pointer'>
                        -
                    </span>
                    <span className='px-3 py-1 border-2'>{qty}</span>
                    <span className='px-3 py-1 border-y-2 border-r-2 rounded-br rounded-tr cursor-pointer'>
                        +
                    </span>
                </div>
                <div className='flex flex-row justify-between'>
                    <span>{price}</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
