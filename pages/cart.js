import CartItem from "@/components/CartItem"
import { DataContext } from "@/store/globalState"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"

const cart = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        cart: { products, totalQty, totalPrice },
    } = state

    const {
        auth: { user },
    } = state

    const router = useRouter()

    const handleCheckout = (e) => {
        e.preventDefault()

        if (!user?.address || !user?.phone) {
            dispatch({
                type: "NOTIFY",
                payload: { error: "Vui lòng cập nhật địa chỉ, số điện thoại!" },
            })
            return router.push("/profile")
        }
        return router.push("/thankyou")
    }
    return (
        <div className='flex justify-center'>
            <Head>
                <title>Giỏ Hàng Của Bạn</title>
            </Head>
            {totalQty === 0 ? (
                <div className='flex items-center justify-center'>
                    <p className='text-lg font-bold'>Cart is empty</p>
                </div>
            ) : (
                <div className='flex flex-row w-3/4'>
                    <div className='flex flex-col flex-1'>
                        {products.map((item, index) => (
                            <CartItem
                                key={index}
                                product={item.product}
                                qty={item.qty}
                            />
                        ))}
                    </div>
                    <div className='flex-[0.5] mt-6 rounded-lg p-6 bg-coca-lightest-95 ml-6 h-[150px]'>
                        <div className='flex justify-between'>
                            <p className='text-lg font-bold'>Tổng cộng:</p>
                            <div className=''>
                                <p className='mb-1 text-lg font-bold'>
                                    {totalPrice.toLocaleString("de-DE")}đ
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className='mt-6 w-full rounded-md bg-coca-medium py-1.5 font-medium text-blue-50 hover:bg-coca-medium-dark'
                        >
                            Thanh Toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default cart
