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
            <div className='absolute bottom-5 right-6'>
                <Chat openChat={openChat} />
            </div>
            <SpeedDial>
                <SpeedDialHandler>
                    <IconButton size='lg' className='rounded-full'>
                        <PlusIcon className='h-5 w-5 transition-transform group-hover:rotate-45' />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction onClick={handleOpenChat}>
                        <ChatBubbleLeftIcon className='h-5 w-5' />
                        <Typography
                            color='blue-gray'
                            className='text-xs font-normal'
                        >
                            Chat
                        </Typography>
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    )
}

export default SpeedDialOption
