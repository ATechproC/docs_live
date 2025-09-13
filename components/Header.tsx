import { assets } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import ActiveCollaborators from "./ActiveCollaborators";

interface HeaderProps  {
    children: React.ReactNode;
    className ?: string
}

const Header = ({ children, className }: HeaderProps) => {
    console.log(typeof children)
    return (
        <header className="md:relative flex-between text-center w-[90%] m-auto flex-wrap mt-1">
            <Link href="/"
            className="w-[100px]">
                <Image src={assets.logo} width={100} height={60} alt="logo" />
            </Link>

            <div className={className}>
                {children}
            </div>

            {/* user profile from clerk */}
            <div className="grid place-items-center">
                <UserButton />
            </div>
        </header>
    );
};

export default Header;
