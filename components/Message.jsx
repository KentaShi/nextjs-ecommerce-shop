import { DataContext } from "@/store/globalState"
import React, { useContext } from "react"

const Message = ({ id, message }) => {
    const isSentByCurrentUser = id === message.user.id
    return isSentByCurrentUser ? (
        <div className='flex justify-end py-0 px-[5%] mt-[3px]'>
            {/* <p className='flex items-center text=[#828282] tracking-[0.3px] pr-[10px]'>
                {id}
            </p> */}
            <div className='inline-block max-w-[80%] text-white py-[5px] px-[20px] rounded-full bg-[#2979ff]'>
                <p className='text-white w-[100%] tracking-normal float-left text-base break-words'>
                    {message.message}
                </p>
            </div>
        </div>
    ) : (
        <div className='flex justify-start py-0 px-[5%] mt-[3px]'>
            <div className='inline-block max-w-[80%] py-[5px] px-[20px] rounded-full bg-[#f3f3f3]'>
                <p className='text-gray-950 w-[100%] tracking-normal float-left text-base break-words'>
                    {message.message}
                </p>
            </div>
            <p className='flex items-center text=[#828282] tracking-[0.3px] pl-[10px] italic text-xs'>
                {message.user.name}
            </p>
        </div>
    )
}

export default Message
