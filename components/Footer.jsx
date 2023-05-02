import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className='bg-teal-100/30 h-[6vh]'>
            <div className='container flex flex-row items-center px-4 py-4 mx-auto justify-around'>
                <div>
                    <Link href={`/`}>Logo</Link>
                </div>
                <div>
                    <Link href={`/about`}>About</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
