import Link from "next/link"
import React, { useContext } from "react"
import Cookies from "js-cookie"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"

const NavbarAdmin = () => {
    const router = useRouter()
    const [state, dispatch] = useContext(DataContext)

    const handleLogout = (e) => {
        e.preventDefault()
        Cookies.remove("refresh_token", { path: "api/auth/accessToken" })
        localStorage.removeItem("firstLogin")
        dispatch({ type: "AUTH", payload: {} })
        dispatch({ type: "NOTIFY", payload: { success: "Logged out." } })

        return router.push("/")
    }
    return (
        <header className='border-b backdrop-blur bg-white/60 fixed w-full top-0 left-0 z-30'>
            <div className='container px-4 py-5 mx-auto flex items-center justify-around'>
                <div className='flex'>
                    <Link href={`/`}>
                        <div className='flex items-center'>
                            <p className='ml-2 text-lg 2xl:text-xl text-coca-darkest font-bold'>
                                AnhAnh Nè
                            </p>
                        </div>
                    </Link>
                </div>

                <div className='flex flex-row justify-end items-center'>
                    <div className='ml-2 cursor-pointer'>
                        <p onClick={handleLogout}>Log Out</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavbarAdmin
