import { DataContext } from "@/store/globalState"
import React, { useContext, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"

const Chat = ({ openChat }) => {
    const isOpen = openChat ? "hidden" : ""

    const [state, dispatch] = useContext(DataContext)

    const {
        auth: { user },
    } = state

    const ENDPOINT = "localhost:5000"

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const handleSendMessage = (e) => {
        e.preventDefault()
        setMessages((messages) => [...messages, message])
        setMessage("")
    }
    return (
        <div
            className={`${isOpen} w-[338px] h-[455px] shadow-md shadow-coca-medium/60  rounded`}
        >
            <div className='flex flex-col justify-between bg-white rounded-lg h-full'>
                <div className='border-b-2 p-2 shadow-sm'>
                    <p>Chat with Shop</p>
                </div>
                <ScrollToBottom className='py-1 px-2 overflow-auto flex-auto'>
                    {messages.map((message, index) => (
                        <Message message={message} key={index} />
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
