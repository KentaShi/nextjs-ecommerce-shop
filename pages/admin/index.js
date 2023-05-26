import React, { useContext, useEffect } from "react"
import { DataContext } from "@/store/globalState"
import { useRouter } from "next/router"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import DeniedAccess from "@/components/DeniedAccess"

const AdminPage = () => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    if (!checkIfUserIsAdmin(user)) {
        return <DeniedAccess />
    }
    return <div>admin</div>
}

export default AdminPage
