import React, { useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import AccessDenied from "@/components/accessDenied"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"

const AdminPage = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    if (!checkIfUserIsAdmin(user)) {
        return <AccessDenied />
    }
    return <div>admin</div>
}

export default AdminPage
