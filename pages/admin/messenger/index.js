import DeniedAccess from "@/components/DeniedAccess"
import ChatAdmin from "@/components/admin/ChatAdmin"
import { DataContext } from "@/store/globalState"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import { getData } from "@/utils/fetchData"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

const HOST = process.env.SERVER_CHAT

const Messenger = (props) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    if (!checkIfUserIsAdmin(user)) {
        return <DeniedAccess />
    }

    const [currentConv, setCurrentConv] = useState()
    const [active, setActive] = useState(null)
    const [conversations, setConversations] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getConversations = async () => {
            const res = await axios.get(`${HOST}/conversations/${user._id}`)
            if (res) {
                setConversations(res.data)
            } else {
                console.log("User not found")
            }
        }
        getConversations()
    }, [user._id])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await getData("user", token)
                if (res) {
                    setUsers(res.users)
                }
            } catch (error) {
                console.log("🚀 ~ file: index.js ~ getUsers ~ error:", error)
            }
        }
        getUsers()
    }, [])

    const handleCurrentChat = (conv, index) => {
        setCurrentConv(conv)
        setActive(index)
    }
    const handleCreateConversation = async (userID) => {
        try {
            const res = await axios.post(`${HOST}/conversations`, {
                sender: user._id,
                receiver: userID,
            })
            setConversations([...conversations], res.data)
        } catch (error) {
            return dispatch({
                type: "NOTIFY",
                payload: { err: error.message },
            })
        }
    }

    return (
        <div className='flex flex-row rounded shadow h-[calc(100vh-50px)]'>
            <div className='flex-[3] flex flex-col p-2 border-r'>
                <p className='text-lg font-bold'>Chat</p>
                <div className='flex flex-col'>
                    {conversations?.map((conv, index) => (
                        <div
                            onClick={() => handleCurrentChat(conv, index)}
                            key={index}
                            className={`p-2 hover:bg-blue-gray-50 rounded-lg cursor-pointer ${
                                active === index ? "bg-blue-gray-50" : ""
                            }`}
                        >
                            <p>{conv._id}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <p className='text-lg font-bold'>Users</p>
                <div className='flex flex-col'>
                    {users?.map((user, index) => (
                        <div
                            onClick={() => handleCreateConversation(user._id)}
                            key={index}
                            className='p-2 hover:bg-blue-gray-50 rounded-lg cursor-pointer  
                            '
                        >
                            <p>{user.fullName}</p>
                        </div>
                    ))}
                </div>
            </div>
            {currentConv ? (
                <ChatAdmin
                    active={active}
                    adminID={user._id}
                    conv={currentConv}
                    useID={currentConv.members.find((m) => m._id !== user._id)}
                />
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
