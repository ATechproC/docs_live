import { assets } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface HeaderProps  {
    children: React.ReactNode;
    className ?: string
}

const Header = ({ children, className }: HeaderProps) => {

    return (
        <header className="relative flex-between text-center w-[90%] m-auto pt-3">
            <Link href="/" className="-mt-2.5 flex-items gap-1">
                <Image src={assets.logo} width={50} height={30} alt="logo" />
                <span className="hidden md:block">LiveDocs</span>
            </Link>

            <div className={className}>
                {children}
            </div>

            {/* user profile from clerk */}
            <div className="grid place-items-center -mt-3">
                <UserButton />
            </div>
        </header>
    );
};

export default Header;
