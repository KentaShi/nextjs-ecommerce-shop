import React, { useState } from "react"
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react"
import {
    EnvelopeIcon,
    EnvelopeOpenIcon,
    PlusIcon,
    HomeIcon,
    CogIcon,
    Square3Stack3DIcon,
    ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline"
import Chat from "./Chat"

const SpeedDialOption = () => {
    const [openChat, setOpenChat] = useState(false)
    const handleOpenChat = () => {
        setOpenChat(!openChat)
    }
    return (
        <div className='fixed bottom-5 right-2'>
            <div className='absolute bottom-0 right-12'>
                <Chat openChat={openChat} />
            </div>
            <SpeedDial>
                <IconButton
                    onClick={handleOpenChat}
                    size='lg'
                    className='rounded-full'
                >
                    {!openChat ? (
                        <PlusIcon className='h-5 w-5 rotate-45' />
                    ) : (
                        <ChatBubbleLeftIcon className='h-5 w-5' />
                    )}
                </IconButton>
            </SpeedDial>
        </div>
    )
}

export default SpeedDialOption
