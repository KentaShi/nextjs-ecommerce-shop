import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import { getData, updateData } from "@/utils/fetchData"

const profile = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    const router = useRouter()

    const initState = {
        fullName: "",
        address: "",
        phone: "",
    }
    const [data, setData] = useState(initState)
    const { fullName, address, phone } = data

    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (user)
            setData({
                ...data,
                fullName: user?.fullName,
                address: user?.address,
                phone: user?.phone,
            })
    }, [state])

    console.log(user)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleEditProfile = (e) => {
        e.preventDefault()

        setIsEditing(!isEditing)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        updateData("user", data, token).then((res) => {
            if (res.err)
                return dispatch({ type: "NOTIFY", payload: { error: res.err } })

            dispatch({
                type: "AUTH",
                payload: { token: token, user: res.user },
            })

            return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
        })

        setIsEditing(false)
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-between rounded-lg p-6 bg-white shadow-lg ml-6 w-[480px] h-auto'>
                    <div className='flex flex-row justify-between items-center'>
                        <img
                            src={user?.avatar}
                            className='w-20 border-4 border-coca-lightest-95 rounded-full'
                        />
                        <button
                            onClick={handleEditProfile}
                            type='button'
                            className=' px-1 text-xs font-semibold text-coca-lightest-95 bg-coca-medium hover:bg-coca-medium-dark hover:shadow-coca-light rounded-lg h-[40px]'
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className='mb-2 flex justify-between border-t-2 py-2'>
                        <p className='text-gray-700 font-bold'>Họ và Tên:</p>
                        {isEditing ? (
                            <input
                                onChange={handleChange}
                                name='fullName'
                                value={fullName}
                                type='text'
                                className='rounded-lg  p-2 border-2 focus:ring-1 focus:ring-coca-medium focus:outline-none transition-all duration-300'
                            />
                        ) : (
                            <p className='text-gray-700'>{fullName}</p>
                        )}
                    </div>
                    <div className='mb-2 flex justify-between border-t-2 py-2'>
                        <p className='text-gray-700 font-bold'>Địa chỉ:</p>
                        {isEditing ? (
                            <textarea
                                onChange={handleChange}
                                name='address'
                                value={address}
                                type='text'
                                className='rounded-lg  p-2 border-2 focus:ring-1 focus:ring-coca-medium focus:outline-none transition-all duration-300'
                            />
                        ) : (
                            <p className='text-gray-700'>{address}</p>
                        )}
                    </div>
                    <div className='mb-2 flex justify-between border-t-2 py-2'>
                        <p className='text-gray-700 font-bold'>
                            Số điện thoại:
                        </p>
                        {isEditing ? (
                            <input
                                onChange={handleChange}
                                name='phone'
                                value={phone}
                                type='text'
                                className='rounded-lg  p-2 border-2 focus:ring-1 focus:ring-coca-medium focus:outline-none transition-all duration-300'
                            />
                        ) : (
                            <p className='text-gray-700'>{phone}</p>
                        )}
                    </div>
                    {isEditing && (
                        <div className='flex justify-center'>
                            <button
                                type='button'
                                onClick={handleUpdate}
                                className='w-[100px] bg-coca-medium hover:bg-coca-medium-dark text-coca-lightest rounded-lg py-2'
                            >
                                Lưu
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

// export async function getServerSideProps() {}

export default profile
