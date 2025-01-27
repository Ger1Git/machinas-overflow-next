'use client';

import Link from 'next/link';

const Navbar = () => {
    const handleLogout = () => {
        console.log('Logout clicked');
    };

    return (
        <div className="flex justify-between items-center px-4 py-4 bg-[#0C9DDA] border-b border-blue-500 shadow-md">
            <Link
                href="/"
                className="flex items-center gap-2 p-2 rounded group cursor-pointer"
            >
                <img
                    src="/machinas.svg"
                    alt="Logo"
                    className="h-10 w-10 object-cover group-hover:scale-110 transition-transform"
                />
                <div className="text-lg font-bold text-white transition-all transform group-hover:ml-2 group-hover:scale-110 group-hover:text-gradient">
                    Machinas Overflow
                </div>
            </Link>

            {/* Navigation Links */}
            <ul className="flex space-x-4">
                <li>
                    <Link
                        href="/notifications"
                        className="text-white hover:text-gray-200"
                    >
                        <img
                            src="/notifications.svg"
                            alt="Notifications"
                            className="h-8 w-8 object-cover group-hover:scale-110 transition-transform"
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href="/account"
                        className="text-white hover:text-gray-200"
                    >
                        <img
                            src="/account.svg"
                            alt="Account"
                            className="h-8 w-8 object-cover group-hover:scale-110 transition-transform"
                        />
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-gray-200"
                    >
                        <img
                            src="/logout.svg"
                            alt="Logout"
                            className="h-8 w-8 object-cover group-hover:scale-110 transition-transform"
                        />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
