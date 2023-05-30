import Link from "next/link"
import React from "react"

const Order = ({ order }) => {
    const displayDetailStatus = (name) => {
        return name === "paid"
            ? "Giao hàng thành công"
            : name === "delivering"
            ? "Đang giao hàng"
            : "Đã đặt hàng"
    }
    return (
        <div className='rounded-lg flex flex-col shadow-lg shadow-coca-lightest mt-6 p-6 w-[auto] xsm:[22rem] sm:w-[32rem]'>
            {order?.products.map((item, index) => (
                <div
                    className='flex flex-row justify-between border-b'
                    key={index}
                >
                    <div className='p-3 flex flex-row'>
                        <img
                            className='rounded-lg'
                            src={item?.product?.images[0].url}
                            height={50}
                            width={50}
                            alt=''
                        />
                        <div className='flex flex-col ml-3'>
                            <p>{item?.product?.name}</p>
                            <span>x {item?.qty}</span>
                        </div>
                    </div>
                    <div className='p-3'>
                        <p className='italic text-sm'>
                            Đơn Giá:{" "}
                            <span className='text-coca-medium-dark'>
                                {item?.product?.price.toLocaleString("de-DE")}đ
                            </span>
                        </p>
                    </div>
                </div>
            ))}
            <div className='flex flex-row justify-between mt-3'>
                <p>
                    Tổng cộng:{" "}
                    <span className='text-coca-medium-dark'>
                        {order.totalQty}
                    </span>{" "}
                    sản phẩm
                </p>
                <p>
                    Thành tiền:{" "}
                    <span className='text-coca-medium-dark'>
                        {order?.totalPrice.toLocaleString("de-DE")}đ
                    </span>
                </p>
            </div>

            <hr className='my-4' />
            <Link href={`/order/${order?._id}`} className='flex flex-col'>
                <p>
                    Trạng thái:{" "}
                    <span className='text-coca-medium-dark'>
                        {displayDetailStatus(
                            order.status[order.status.length - 1].statusName
                        )}
                    </span>
                </p>
                <p>
                    Thời gian:{" "}
                    <span className='text-coca-medium-dark'>
                        {new Date(
                            order.status[order.status.length - 1].statusTime
                        ).toLocaleString("id-ID")}
                    </span>
                </p>
            </Link>
        </div>
    )
}

export default Order
