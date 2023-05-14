import Link from "next/link"
import React from "react"

const OrderIItem = ({ order }) => {
    return (
        <div className='rounded-lg flex flex-col shadow-lg shadow-coca-lightest mt-6 p-6'>
            <Link href={`/order/${order?._id}`} className='flex flex-col'>
                {order?.products.map((item, index) => (
                    <div key={index}>
                        <p>product ID: {item.productID}</p>
                    </div>
                ))}
                <span>{order.totalQty} sản phẩm</span>
                <hr className='my-4' />
                <span>Thành tiền: {order?.totalPrice}đ</span>
                <p>Trạng Thái: {order.status}</p>
            </Link>
        </div>
    )
}

export default OrderIItem
