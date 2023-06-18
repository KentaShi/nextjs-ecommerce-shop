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

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState()

    useEffect(() => {
        socket = io(ENDPOINT, {
            transports: ["websocket"],
            query: { isAdmin: isAdmin },
        })

        socket.on("getMessage", ({ sender, content, conversationID }) => {
            setMessages((messages) => [
                ...messages,
                { sender, content, conversationID },
            ])
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [])

    useEffect(() => {
        socket.emit("addUser", user._id)
    }, [user])

    useEffect(() => {
        const getConversationsAndMessages = async () => {
            try {
                const res = await axios.get(`${HOST}/conversations/${user._id}`)
                if (res.data.length > 0) {
                    setConversation(res.data[0])
                    try {
                        const resMessage = await axios.get(
                            `${HOST}/messages/${res.data[0]._id}`
                        )
                        setMessages(resMessage.data)
                    } catch (error) {
                        console.log(
                            "🚀 ~ file: ChatAdmin.jsx:43 ~ getMessages ~ error:",
                            error
                        )
                    }
                } else {
                    console.log("Not found any conversation")
                }
            } catch (error) {
                console.log(
                    "🚀 ~ file: Chat.jsx:39 ~ getConversations ~ error:",
                    error
                )
            }
        }
        getConversationsAndMessages()
    }, [user])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (newMessage !== "") {
            const message = {
                sender: user._id,
                content: newMessage,
                conversationID: conversation._id,
            }
            const receiver = conversation.members.find(
                (member) => member !== user._id
            )
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
                        value={newMessage}
                        className='border-none rounded-full w-[80%] h-[36px] bg-blue-gray-50 px-3 py-3 text-sm focus:outline-none'
                        type='text'
                        placeholder='Type a message...'
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" ? handleSendMessage(e) : null
                        }
                    />
                    <button
                        type='button'
                        onClick={handleSendMessage}
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
