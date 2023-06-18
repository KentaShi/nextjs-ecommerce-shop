import { DataContext } from "@/store/globalState"
import { getData } from "@/utils/fetchData"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import MessageAdmin from "./MessageAdmin"
import { io } from "socket.io-client"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
const HOST = process.env.SERVER_CHAT
let socket
const ENDPOINT = "localhost:8000"

const ChatAdmin = ({ active, conv, adminID, userID }) => {
    const [state, dispatch] = useContext(DataContext)
    const {
        auth: { user, token },
    } = state

    const isAdmin = checkIfUserIsAdmin(user)

    const [customer, setCustomer] = useState()
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket = io(ENDPOINT, {
            transports: ["websocket"],
            query: { isAdmin: isAdmin },
        })

        socket.on("getMessage", ({ sender, content, conversationID }) => {
            if (conv._id === conversationID) {
                setMessages((messages) => [
                    ...messages,
                    { sender, content, conversationID },
                ])
            }
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [])

    useEffect(() => {
        socket.emit("addUser", adminID)
    }, [adminID])

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
        if (newMessage !== "") {
            const message = {
                sender: user._id,
                content: newMessage,
                conversationID: conv._id,
            }
            const receiver = conv.members.find((member) => member !== adminID)
            console.log("receiver:", receiver)
            socket.emit("message", { ...message, receiver }, () =>
                setNewMessage("")
            )

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
