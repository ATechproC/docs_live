import { assets } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
    return (
        <header className="flex-between text-center w-[90%] m-auto flex-wrap mt-1">
            <div>
                <Image src={assets.logo} width={100} height={60} alt="logo" />
            </div>
            <div className="flex-items gap-1">
                Untitled <Image className="cursor-pointer" src={assets.edit} alt="edit" height={18} width={18} />
            </div>
            <div className="flex-items gap-2">
                <button className="flex-items gap-1 px-2 py-[2px] rounded-md bg-blue-500">
                    <Image src={assets.share} width={18} height={18} alt="" /> Share
                </button>
                {/* user profile from clerk */}
                <div className="grid place-items-center">
                <UserButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
