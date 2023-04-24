import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className='bg-teal-100/30'>
            <div className='container flex flex-row items-center px-4 py-4 mx-auto justify-around'>
                <div>
                    <p>Logo</p>
                </div>
                <div>
                    <Link href={`/about`}>About</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
