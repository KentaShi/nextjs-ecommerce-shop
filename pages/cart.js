import CartItem from "@/components/CartItem"
import { DataContext } from "@/store/globalState"
import { postData } from "@/utils/fetchData"
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
        auth: { user, token },
    } = state

    const router = useRouter()

    const handleCheckout = async (e) => {
        e.preventDefault()

        if (!user) {
            dispatch({
                type: "NOTIFY",
                payload: { error: "Vui lòng đăng ký thông tin giao hàng!" },
            })
            return router.push("/register")
        }

        if (!user?.address || !user?.phone) {
            dispatch({
                type: "NOTIFY",
                payload: { error: "Vui lòng cập nhật địa chỉ, số điện thoại!" },
            })
            return router.push("/profile")
        }

        //create order and put in Order model, delete Cart state
        const newOrder = {
            userID: user._id,
            products: products,
            totalQty,
            totalPrice,
            address: user.address,
            phone: user.phone,
        }

        await postData("order", newOrder, token)
            .then((res) => {
                if (res.err) {
                    return dispatch({
                        type: "NOTIFY",
                        payload: { error: res.err },
                    })
                }

                dispatch({
                    type: "ADD_TO_CART",
                    payload: { products: [], totalQty: 0, totalPrice: 0 },
                })

                const newOrder = { ...res.order, user: user }
                dispatch({ type: "NOTIFY", payload: { success: res.msg } })
                return router.push("/thankyou")
            })
            .catch((err) => {
                return dispatch({ type: "NOTIFY", payload: { error: err } })
            })
    }
    return (
        <div className='flex justify-center'>
            <Head>
                <title>Giỏ Hàng Của Bạn</title>
            </Head>
            {totalQty === 0 || !products ? (
                <div className='flex items-center justify-center'>
                    <p className='text-lg font-bold'>Cart is empty</p>
                </div>
            ) : (
                <div className='flex flex-col lg:flex-row w-3/4'>
                    <div className='flex flex-col flex-1'>
                        {products.map((item, index) => (
                            <CartItem
                                key={index}
                                product={item.product}
                                qty={item.qty}
                            />
                        ))}
                    </div>
                    <div className='flex-[0.5] mt-6 rounded-lg p-6 bg-coca-lightest-95 lg:ml-6 h-[150px]'>
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
