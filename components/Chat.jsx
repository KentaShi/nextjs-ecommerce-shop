import { DataContext } from "@/store/globalState"
import React, { useContext, useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { io } from "socket.io-client"
import { checkIfUserIsAdmin } from "@/utils/adminUtils"

const ENDPOINT = "localhost:8000"
let socket

const Chat = ({ openChat, setOpenChat }) => {
    const isOpen = openChat ? "" : "hidden"

    const [state, dispatch] = useContext(DataContext)

    const {
        auth: { user },
    } = state

    const initialMessages = {
        name: "",
        message: "",
        admin: false,
    }

    const isAdmin = checkIfUserIsAdmin(user)

    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([initialMessages])

    useEffect(() => {
        socket = io(ENDPOINT, {
            transports: ["websocket"],
            query: { isAdmin: isAdmin },
        })

        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [user])
    useEffect(() => {
        socket.on("message", ({ message, name }) => {
            setMessages((messages) => [
                ...messages,
                { message, name, admin: isAdmin },
            ])
            setName(name)
        })
    }, [])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message !== "") {
            socket.emit(
                "message",
                { message, name: isAdmin ? "admin" : user.fullName },
                () => setMessage("")
            )
            setMessages((messages) => [
                ...messages,
                { message, name: isAdmin ? "admin" : user.fullName },
            ])
        }
    }
    return (
        <div
            className={`${isOpen} w-[338px] h-[455px] shadow-md shadow-gray-600/60 rounded-xl`}
        >
            <div className='flex flex-col justify-between bg-white rounded-xl h-full'>
                <div className='flex flex-row justify-between items-center border-b-2 p-2 shadow-sm'>
                    <p>Chat with Shop</p>
                    <XMarkIcon
                        className='cursor-pointer hover:bg-blue-gray-50 hover:rounded-full'
                        width={20}
                        height={20}
                        onClick={() => setOpenChat(!openChat)}
                    />
                </div>
                <ScrollToBottom className='py-1 px-2 overflow-auto flex-auto'>
                    {messages.map((message, index) => (
                        <Message
                            name={message.name}
                            message={message.message}
                            key={index}
                            isAdmin={message.admin}
                        />
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
