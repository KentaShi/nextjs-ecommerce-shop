import Link from "next/link"
import {
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { DataContext } from "@/store/globalState"
import Cookies from "js-cookie"

const Navbar = () => {
    const router = useRouter()
    const [state, dispatch] = useContext(DataContext)
    const {
        auth,
        cart: { totalQty },
    } = state

    const isActive = (r) => {
        if (r === router.pathname) {
            return " font-semibold"
        } else {
            return ""
        }
    }

    const profileMenuItems = [
        { label: "Thông Tin Cá Nhân", icon: "", path: "profile" },
        { label: "Đơn Hàng", icon: "", path: "order" },
        { label: "Đăng Xuất", icon: "", path: "logout" },
    ]

    const ProfileMenu = ({ fullName, avatar }) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false)

        const closeMenu = () => setIsMenuOpen(false)

        const handleLogout = (e) => {
            e.preventDefault()
            Cookies.remove("refresh_token", { path: "api/auth/accessToken" })
            localStorage.removeItem("firstLogin")
            dispatch({ type: "AUTH", payload: {} })
            dispatch({ type: "NOTIFY", payload: { success: "Logged out." } })
        }

        const handleProfile = (e) => {
            router.push("/profile")
        }
        const handleOrder = (e) => {
            router.push("/order")
        }
        return (
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement='bottom-end'
            >
                <MenuHandler>
                    <Button
                        variant='text'
                        color='blue-gray'
                        className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
                    >
                        <Avatar
                            variant='circular'
                            size='sm'
                            alt={fullName}
                            className='border border-blue-500 p-0.5'
                            src={avatar}
                        />
                        {fullName}
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${
                                isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className='p-1'>
                    {profileMenuItems.map(({ label, path }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1
                        return (
                            <MenuItem
                                key={label}
                                onClick={
                                    path === "logout"
                                        ? handleLogout
                                        : path === "profile"
                                        ? handleProfile
                                        : path === "order"
                                        ? handleOrder
                                        : closeMenu
                                }
                                className={`flex items-center gap-2 rounded ${
                                    isLastItem
                                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                        : ""
                                }`}
                            >
                                <Typography
                                    as='span'
                                    variant='small'
                                    className='font-normal'
                                    color={isLastItem ? "red" : "inherit"}
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Menu>
        )
    }

    return (
        <header className='border-b backdrop-blur bg-white/60 fixed w-full top-0 left-0 z-30'>
            <div className='container px-4 py-5 mx-auto flex items-center justify-around'>
                <div className='flex'>
                    <Link href={`/`}>
                        <div className={"flex items-center" + isActive("/")}>
                            <p className='ml-2 text-lg 2xl:text-xl text-coca-darkest font-bold'>
                                AnhAnh's Coffee
                            </p>
                        </div>
                    </Link>
                </div>

                <div className='flex flex-row justify-end items-center'>
                    <div>
                        <Link
                            className='text-gray-800 hover:text-gray-950 transition-colors duration-300'
                            href={`/cart`}
                        >
                            <div className={"relative" + isActive("/cart")}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                    />
                                </svg>
                                <span className='absolute bg-red-500 h-[18px] w-[18px] rounded-full text-center text-xs text-white border-[1px] border-white -top-2 -right-1'>
                                    {totalQty}
                                </span>
                            </div>
                        </Link>
                    </div>
                    {Object.keys(auth).length === 0 ? (
                        <div className='ml-2'>
                            <Link href={`/login`}>
                                <div
                                    className={
                                        "flex items-center" + isActive("/login")
                                    }
                                >
                                    <p className='ml-2 text-lg 2xl:text-xl'>
                                        Sign In
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className='ml-2'>
                            <ProfileMenu
                                fullName={auth?.user?.fullName}
                                avatar={auth?.user?.avatar}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
