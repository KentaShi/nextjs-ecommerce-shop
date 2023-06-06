import React from "react"

const Chat = ({ openChat }) => {
    const isOpen = openChat ? "hidden" : ""
    return (
        <div
            className={`${isOpen} flex justify-center items-center h-[50vh] bg-coca-darkest`}
        >
            <div className='flex flex-col justify-between bg-white rounded-lg'>
                <h2>Chat with Shop</h2>
                <p>Messages</p>
                <form action=''>
                    <input type='text' />
                    <button>send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
