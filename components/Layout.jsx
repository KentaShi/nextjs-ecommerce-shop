import React, { useContext } from "react"
import Navbar from "./Navbar"
import NavbarAdmin from "./admin/NavbarAdmin"
import Footer from "./Footer"
import Notify from "./Notify"

import { DataContext } from "@/store/globalState"

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
                <div className='mt-28 mx-44 min-h-[82vh]'>{children}</div>
                <Footer />
            </div>
        )
    }

    const AdminLayout = ({ children }) => {
        return (
            <div>
                <NavbarAdmin />
                <div>you are admin</div>
            </div>
        )
    }
    return (
        <>
            {user?.role === "admin" ? (
                <AdminLayout children={children} />
            ) : (
                <UserLayout children={children} />
            )}
        </>
    )
}

export default Layout
