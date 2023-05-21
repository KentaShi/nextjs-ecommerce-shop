import React, { useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import admin from "@/middleware/admin"

const AdminPage = () => {
    return <div>admin</div>
}

export default admin(AdminPage)
