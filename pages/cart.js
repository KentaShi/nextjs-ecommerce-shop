import CartItem from "@/components/CartItem";
import { DataContext } from "@/store/globalState";
import { useContext } from "react";

const cart = () => {
    const [state, dispatch] = useContext(DataContext);
    const {
        cart: { products, totalQty, totalPrice },
    } = state;
    return (
        <div>
            {totalQty === 0 ? (
                <div className='flex items-center justify-center'>
                    <p className='text-lg font-bold'>Cart is empty</p>
                </div>
            ) : (
                <div className='flex flex-row'>
                    <div className='flex flex-col flex-1'>
                        {products.map((item, index) => (
                            <CartItem
                                key={index}
                                product={item.product}
                                qty={item.qty}
                            />
                        ))}
                    </div>
                    <div className='flex-[0.5] mt-6 rounded-lg p-6 bg-teal-50 ml-6'>
                        <div className='mb-2 flex justify-between'>
                            <p className='text-gray-700'>Subtotal</p>
                            <p className='text-gray-700'>$129.99</p>
                        </div>
                        <div class='flex justify-between'>
                            <p className='text-gray-700'>Shipping</p>
                            <p className='text-gray-700'>$4.99</p>
                        </div>
                        <hr className='my-4' />
                        <div className='flex justify-between'>
                            <p className='text-lg font-bold'>Total</p>
                            <div className=''>
                                <p className='mb-1 text-lg font-bold'>
                                    ${totalPrice}
                                </p>
                                <p className='text-sm text-gray-700'>
                                    including VAT
                                </p>
                            </div>
                        </div>
                        <button className='mt-6 w-full rounded-md bg-teal-500 py-1.5 font-medium text-blue-50 hover:bg-teat-600'>
                            Check out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default cart;
