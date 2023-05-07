import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Notify from "./Notify"

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <Notify />
            <div className='mt-28 mx-44 min-h-[82vh] flex justify-center'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
