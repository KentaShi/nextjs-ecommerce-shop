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

    const handleCurrentChat = (conv, index) => {
        setCurrentConv(conv)
        setActive(index)
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
            </div>
            {currentConv ? (
                <ChatAdmin adminID={user._id} conv={currentConv} />
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
