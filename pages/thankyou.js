import Head from "next/head"
import Link from "next/link"
import React from "react"

const Thankyou = () => {
    return (
        <>
            <Head>
                <title>Thank You!</title>
            </Head>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center rounded-lg p-6 shadow-lg ml-6 w-[480px] h-auto'>
                    <p className='text-lg font-bold flex justify-center pb-3'>
                        Cảm ơn bạn đã mua hàng!
                    </p>
                    <Link href={"/"}>
                        <button className='mt-6 w-full rounded-md bg-coca-medium py-1.5 font-semibold text-white hover:bg-coca-medium-dark'>
                            Về Trang Chủ
                        </button>
                    </Link>
                    <Link href={"/order"}>
                        <button className='mt-6 w-full rounded-md bg-coca-medium py-1.5 font-semibold text-white hover:bg-coca-medium-dark'>
                            Theo dõi đơn hàng
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Thankyou
