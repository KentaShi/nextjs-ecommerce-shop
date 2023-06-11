import React, { useContext } from "react"
import Navbar from "./Navbar"
import NavbarAdmin from "./admin/NavbarAdmin"
import Footer from "./Footer"
import Notify from "./Notify"

import { DataContext } from "@/store/globalState"
import Sidebar from "./admin/Sidebar"
import SpeedDialOption from "./SpeedDialOption"

const Layout = ({ children }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state
    let isLogined = false
    if (user) {
        isLogined = true
    }

    const UserLayout = () => {
        return (
            <div className='flex flex-col min-h-screen relative'>
                <Navbar />
                <Notify />
                <div className='mt-28 min-h-[82vh]'>{children}</div>
                {isLogined && <SpeedDialOption />}
                <Footer />
            </div>
        )
    }

    const AdminLayout = () => {
        return (
            <div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased'>
                <Sidebar />
                <div className='ml-14 md:ml-64 h-full min-h-screen mb-10 p-4'>
                    {children}
                </div>
                {isLogined && <SpeedDialOption />}
                <Notify />
            </div>
        )
    }
    return (
        <div>{user?.role === "admin" ? <AdminLayout /> : <UserLayout />}</div>
    )
}

export default Layout
