import ChatAdmin from "@/components/admin/ChatAdmin"
import { DataContext } from "@/store/globalState"
import { getData } from "@/utils/fetchData"
import { useContext, useEffect, useState } from "react"

const Messenger = (props) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [active, setActive] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const res = await getData("user", token)
            if (res) {
                setUsers(res.users)
            } else {
                console.log("User not found")
            }
        }
        fetchData()
    }, [])

    const handleCurrentChat = (user, index) => {
        setCurrentUser(user)
        setActive(index)
    }

    return (
        <div className='flex flex-row rounded shadow h-[calc(100vh-50px)]'>
            <div className='flex-[3] flex flex-col p-2 border-r'>
                <p className='text-lg font-bold'>Chat</p>
                <div className='flex flex-col'>
                    {users?.map((user, index) => (
                        <div
                            onClick={() => handleCurrentChat(user, index)}
                            key={index}
                            className={`p-2 hover:bg-blue-gray-50 rounded-lg cursor-pointer ${
                                active === index ? "bg-blue-gray-50" : ""
                            }`}
                        >
                            <p>{user.fullName}</p>
                        </div>
                    ))}
                </div>
            </div>
            {currentUser ? (
                <ChatAdmin user={currentUser} />
            ) : (
                <div className='flex-[9] p-2 flex justify-center items-center'>
                    <p className='text-5xl uppercase text-blue-gray-600 font-semibold'>
                        Choose a conversation
                    </p>
                </div>
            )}
        </div>
    )
}

// export const getServerSideProps = async () => {
//     const res = await getData("user")
//     console.log(res)
//     return {
//         props: { users: res.users || [], result: res.result || null },
//     }
// }

export default Messenger
