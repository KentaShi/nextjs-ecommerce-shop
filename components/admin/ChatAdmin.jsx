import React from "react"

const ChatAdmin = ({ user }) => {
    return (
        <div className='flex-[9] p-2'>
            <p className='text-lg font-bold border-b'>Chat {user?.fullName}</p>
            <div>{user._id}</div>
        </div>
    )
}

export default ChatAdmin
