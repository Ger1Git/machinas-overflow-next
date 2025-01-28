'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navbarLinks } from '../utils/navbarLinks';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleLogout = () => {
        console.log('Logout clicked');
    };

    return (
        <div>
            <div className="flex justify-between items-center px-4 py-4 bg-[#0C9DDA] border-b border-blue-500 shadow-md">
                <Link
                    href="/"
                    className="flex items-center gap-2 p-2 rounded group cursor-pointer"
                >
                    <Image
                        src="/machinas.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="text-lg font-bold text-white transition-all transform group-hover:ml-2 group-hover:scale-110 group-hover:text-gradient">
                        Machinas Overflow
                    </div>
                </Link>

                <button
                    onClick={() => setMenuOpen((prevState) => !prevState)}
                    className="sm:hidden text-white"
                    aria-label="Toggle Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            <div>
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-10"
                        onClick={() => setMenuOpen((prevState) => !prevState)}
                    ></div>
                )}

                <div
                    className={`fixed top-0 right-0 bottom-0 w-64 bg-[#0C9DDA] z-20 flex flex-col transition-all duration-300 ease-in-out transform ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <ul className="flex flex-col space-y-4 p-4 flex-grow">
                        {navbarLinks.map((link, index) => (
                            <li key={index} className="p-2">
                                {!link.isButton && (
                                    <Link
                                        href={link.href}
                                        className="text-white hover:text-gray-200 flex gap-2 items-center"
                                    >
                                        <Image
                                            src={link.src}
                                            alt={link.alt}
                                            width={32}
                                            height={32}
                                            className="object-cover group-hover:scale-110 transition-transform"
                                        />
                                        <span>{link.alt}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-end items-center p-4">
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-gray-200 p-4"
                        >
                            <Image
                                src="/logout.svg"
                                alt="Logout"
                                width={32}
                                height={32}
                                className="object-cover group-hover:scale-110 transition-transform"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
