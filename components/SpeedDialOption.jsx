import React from "react"
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

const SpeedDialOption = () => {
    return (
        <div className='fixed bottom-5 right-2'>
            <SpeedDial>
                <SpeedDialHandler>
                    <IconButton size='lg' className='rounded-full'>
                        <PlusIcon className='h-5 w-5 transition-transform group-hover:rotate-45' />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction>
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
