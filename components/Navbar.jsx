import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
    const router = useRouter();
    const isActive = (r) => {
        if (r === router.pathname) {
            return " font-semibold";
        } else {
            return "";
        }
    };
    return (
        <header className='border-b backdrop-blur bg-teal-100/80 fixed w-full top-0 left-0 z-30'>
            <div className='container px-4 py-5 mx-auto flex items-center justify-around'>
                <div className='flex'>
                    <Link href={`/`}>
                        <div className={"flex items-center" + isActive("/")}>
                            <p className='ml-2 text-lg 2xl:text-xl'>Logo</p>
                        </div>
                    </Link>
                </div>

                <div className='flex flex-row items-center space-x-3 bg-white rounded-lg'>
                    <div className='flex flex-wrap justify-between'>
                        <input
                            type='text'
                            className='w-24 h-10 px-4 text-sm text-gray-800 bg-white border-gray-200 rounded-lg transition-all duration-300 focus:w-96 focus:outline-none'
                            placeholder='Search...'
                        />
                    </div>
                    <button
                        type='button'
                        className='flex items-center justify-center h-10 px-5 border-l text-sm font-medium text-center text-teal-950 transition-colors rounded-r-lg duration-300 transform bg-white hover:bg-teal-500'
                    >
                        Search
                    </button>
                </div>

                <div className='flex flex-row justify-end items-center'>
                    <div>
                        <Link
                            className='text-gray-800 hover:text-gray-950 transition-colors duration-300'
                            href={`/cart`}
                        >
                            <div className={"" + isActive("/cart")}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                    />
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <div className='ml-2'>
                        <Link href={`/login`}>
                            <div
                                className={
                                    "flex items-center" + isActive("/login")
                                }
                            >
                                <p className='ml-2 text-lg 2xl:text-xl'>
                                    Sign In
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
