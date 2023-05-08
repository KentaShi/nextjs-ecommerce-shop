import { DataContext } from "@/store/globalState"
import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

const order = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state

    const router = useRouter()

    const {
        cart: { totalPrice },
    } = state

    const handleCheckout = (e) => {
        e.preventDefault()

        if (!user?.address || !user?.phone) {
            return dispatch({
                type: "NOTIFY",
                payload: { error: "Please update payment information." },
            })
        }
    }

    useEffect(() => {
        if (!user) router.push("/login")
    }, [])

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col justify-center rounded-lg p-6 bg-coca-lightest-95 ml-6 w-[480px] h-[300px]'>
                <Head>
                    <title>Xác Nhận Đặt Hàng</title>
                </Head>
                <p className='text-lg font-bold flex justify-center pb-3'>
                    Payment Information
                </p>
                <hr />
                <div className='mb-2 flex justify-between'>
                    <p className='text-gray-700'>Họ và Tên:</p>
                    <p className='text-gray-700'>{user?.fullName}</p>
                </div>
                <div class='mb-2 flex justify-between'>
                    <p className='text-gray-700'>Địa chỉ:</p>
                    <p className='text-gray-700'>{user?.address}</p>
                </div>
                <div class='mb-2 flex justify-between'>
                    <p className='text-gray-700'>Số điện thoại:</p>
                    <p className='text-gray-700'>{user?.phone}</p>
                </div>
                <hr className='my-4' />
                <div className='flex justify-between'>
                    <p className='text-lg font-bold'>Tổng thanh toán</p>
                    <div className=''>
                        <p className='mb-1 text-lg font-bold'>{totalPrice}đ</p>
                    </div>
                </div>

                <button
                    type='button'
                    onClick={handleCheckout}
                    className='mt-6 w-full rounded-md bg-coca-dark py-1.5 font-medium text-blue-50 hover:bg-coca-darkest'
                >
                    Xác Nhận
                </button>
            </div>
        </div>
    )
}

export default order
