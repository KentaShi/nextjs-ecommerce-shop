import React, { useContext } from "react"
import Navbar from "./Navbar"
import NavbarAdmin from "./admin/NavbarAdmin"
import Footer from "./Footer"
import Notify from "./Notify"

import { DataContext } from "@/store/globalState"
import Sidebar from "./admin/Sidebar"

const Layout = ({ children }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user },
    } = state

    const UserLayout = ({ children }) => {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <Notify />
                <div className='mt-28 min-h-[82vh]'>{children}</div>
                <Footer />
            </div>
        )
    }

    const AdminLayout = ({ children }) => {
        return (
            <div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased'>
                <NavbarAdmin />
                <Sidebar />
                <div className='mt-14 ml-14 md:ml-64 h-full min-h-screen mb-10 p-4'>
                    {children}
                </div>
                <Notify />
            </div>
        )
    }
    return (
        <>
            {user?.role === "admin" ? (
                <AdminLayout>{children}</AdminLayout>
            ) : (
                <UserLayout>{children}</UserLayout>
            )}
        </>
    )
}

export default Layout
