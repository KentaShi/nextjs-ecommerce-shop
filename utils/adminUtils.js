export const checkIfUserIsAdmin = (user) => {
    return user?.role === "admin"
}
