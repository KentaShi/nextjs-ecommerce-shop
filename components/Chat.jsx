import { DataContext } from "@/store/globalState"
import React, { useContext, useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { io } from "socket.io-client"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"
import axios from "axios"

const ENDPOINT = "localhost:8000"
const HOST = process.env.SERVER_CHAT
let socket

const Chat = ({ openChat, setOpenChat }) => {
    const isOpen = openChat ? "" : "hidden"

    const [state, dispatch] = useContext(DataContext)

    const {
        auth: { user },
    } = state

    const isAdmin = checkIfUserIsAdmin(user)

    const [name, setName] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
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

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(
                    `${HOST}/messages/${conversations[0]._id}`
                )
                setMessages(res.data)
            } catch (error) {
                console.log(
                    "🚀 ~ file: ChatAdmin.jsx:35 ~ getMessages ~ error:",
                    error
                )
            }
        }
        getMessages()
    }, [conversations])

    useEffect(() => {
        socket = io(ENDPOINT, {
            transports: ["websocket"],
            query: { isAdmin: isAdmin },
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [])
    useEffect(() => {
        socket.on("message", ({ message, user }) => {
            setMessages((messages) => [...messages, { message, user }])
            setName(user.name)
        })
    }, [])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (newMessage !== "") {
            socket.emit(
                "message",
                {
                    message,
                    user: { id: user._id, name: user.fullName },
                },
                () => setNewMessage("")
            )
            setMessages((messages) => [
                ...messages,
                {
                    newMessage,
                    user: { id: user._id, name: user.fullName },
                },
            ])
        }
    }
    return (
        <div
            className={`${isOpen} w-[338px] h-[455px] shadow-md shadow-gray-600/60 rounded-xl`}
        >
            <div className='flex flex-col justify-between bg-white rounded-xl h-full'>
                <div className='flex flex-row justify-between items-center border-b-2 p-2 shadow-sm'>
                    <p>Chat with Admin</p>
                    <XMarkIcon
                        className='cursor-pointer hover:bg-blue-gray-50 hover:rounded-full'
                        width={20}
                        height={20}
                        onClick={() => setOpenChat(!openChat)}
                    />
                </div>
                <ScrollToBottom className='py-1 px-2 overflow-auto flex-auto'>
                    {messages.map((message, index) => (
                        <Message id={user._id} message={message} key={index} />
                    ))}
                </ScrollToBottom>
                <form className='flex flex-row m-1 p-1 rounded border-[#d3d3d3]'>
                    <input
                        value={message}
                        className='border-none rounded-full w-[80%] h-[36px] bg-blue-gray-50 px-3 py-3 text-sm focus:outline-none'
                        type='text'
                        placeholder='Type a message...'
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" ? handleSendMessage(e) : null
                        }
                    />
                    <button
                        type='button'
                        onClick={(e) => handleSendMessage(e)}
                        className='text-white rounded-full ml-1 uppercase text-xs bg-coca-medium border-none w-[20%] flex text-center items-center justify-center'
                    >
                        send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat
