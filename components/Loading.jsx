import React from "react";

const Loading = () => {
    return (
        <div className='flex flex-1 items-center justify-center mt-8 z-10'>
            <div className='w-8 h-8 border-4 border-teal-300 rounded-full border-t-transparent animate-spin'></div>
            <p className='ml-2'>Waiting...</p>
        </div>
    );
};

export default Loading;
