import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"

const profile = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state

    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)

    const handleEditProfile = (e) => {
        e.preventDefault()

        setIsEditing(!isEditing)
    }

    // useEffect(() => {
    //     if (!user) router.push("/login")
    // }, [])
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
                            class='w-20 border-4 border-coca-lightest-95 rounded-full'
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
                                value={user?.fullName}
                                type='text'
                                className='rounded-lg  p-2 border-2 focus:ring-1 focus:ring-coca-medium focus:outline-none transition-all duration-300'
                            />
                        ) : (
                            <p className='text-gray-700'>{user?.fullName}</p>
                        )}
                    </div>
                    <div class='mb-2 flex justify-between border-t-2 py-2'>
                        <p className='text-gray-700 font-bold'>Địa chỉ:</p>
                        {isEditing ? (
                            <textarea
                                value={user?.address}
                                type='text'
                                className='rounded-lg  p-2 border-2 focus:ring-1 focus:ring-coca-medium focus:outline-none transition-all duration-300'
                            />
                        ) : (
                            <p className='text-gray-700'>{user?.address}</p>
                        )}
                    </div>
                    <div class='mb-2 flex justify-between border-t-2 py-2'>
                        <p className='text-gray-700 font-bold'>
                            Số điện thoại:
                        </p>
                        {isEditing ? (
                            <input
                                value={user?.phone}
                                type='text'
                                className='rounded-lg  p-2 border-2 focus:ring-1 focus:ring-coca-medium focus:outline-none transition-all duration-300'
                            />
                        ) : (
                            <p className='text-gray-700'>{user?.phone}</p>
                        )}
                    </div>
                    {isEditing && (
                        <div className='flex justify-center'>
                            <button className='w-[100px] bg-coca-medium hover:bg-coca-medium-dark text-coca-lightest rounded-lg py-2'>
                                Lưu
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default profile
