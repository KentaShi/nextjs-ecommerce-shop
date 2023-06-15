import { DataContext } from "@/store/globalState"
import { getData } from "@/utils/fetchData"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import MessageAdmin from "./MessageAdmin"

const HOST = process.env.SERVER_CHAT

const ChatAdmin = ({ conv, adminID }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    const [customer, setCustomer] = useState()
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const userID = conv.members.find((member) => member._id !== adminID)
        const getUser = async () => {
            try {
                const res = await getData("user/" + userID, token)
                if (res) {
                    setCustomer(res.user)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [conv])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${HOST}/messages/${conv._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(
                    "🚀 ~ file: ChatAdmin.jsx:35 ~ getMessages ~ error:",
                    error
                )
            }
        }
        getMessages()
    }, [conv])

    const handleSendMessage = async (e) => {
        e.preventDefault()

        const message = {
            sender: user._id,
            content: newMessage,
            conversationID: conv._id,
        }

        try {
            const res = await axios.post(`${HOST}/messages`, message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(
                "🚀 ~ file: ChatAdmin.jsx:62 ~ handleSendMessage ~ error:",
                error
            )
        }
    }
    return (
        <div className='flex-[9] shadow'>
            <div className='flex flex-col justify-between bg-white rounded-xl h-full'>
                <div className='flex flex-row justify-between items-center border-b-2'>
                    <p className='p-2'>Chat with {customer?.fullName}</p>
                </div>
                <ScrollToBottom className='py-1 px-2 overflow-auto flex-auto'>
                    {messages.map((message, index) => (
                        <MessageAdmin
                            id={adminID}
                            message={message}
                            key={index}
                        />
                    ))}
                </ScrollToBottom>
                <form className='flex flex-row m-1 p-1 rounded border-[#d3d3d3]'>
                    <input
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        className='border-none rounded-full w-[80%] h-[36px] bg-blue-gray-50 px-3 py-3 text-sm focus:outline-none'
                        type='text'
                        placeholder='Type a message...'
                        onKeyPress={(e) =>
                            e.key === "Enter" ? handleSendMessage(e) : null
                        }
                    />
                    <button
                        onClick={handleSendMessage}
                        type='button'
                        className='text-white rounded-full ml-1 uppercase text-xs bg-coca-medium border-none w-[20%] flex text-center items-center justify-center'
                    >
                        send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatAdmin
