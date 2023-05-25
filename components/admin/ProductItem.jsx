import {
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react"
import React from "react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const ProductItem = ({ product, classes }) => {
    const { _id, name, price, images, category, sold } = product
    return (
        <tr>
            <td className={classes}>
                <div className='flex items-center gap-3'>
                    <Avatar
                        src={images[0].url}
                        alt={name}
                        size='md'
                        className='border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1'
                    />
                    <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-bold'
                    >
                        {name}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {price.toLocaleString("de-DE")}đ
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {category}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                >
                    {sold}
                </Typography>
            </td>
            <td className={classes}>terst</td>
            <td className={classes}>
                <Link href={`/admin/products/${_id}`}>
                    <Tooltip content='Chỉnh sửa'>
                        <IconButton variant='text' color='blue-gray'>
                            <PencilIcon className='h-4 w-4' />
                        </IconButton>
                    </Tooltip>
                </Link>
            </td>
            <td className={classes}>
                <Tooltip content='Xóa'>
                    <IconButton variant='text' color='blue-gray'>
                        <TrashIcon className='h-4 w-4' />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default ProductItem
