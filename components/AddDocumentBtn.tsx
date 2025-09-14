"use client";

import { assets } from "@/constants"
import { createDocument } from "@/lib/actions/room.action";
import Image from "next/image"
import { useRouter } from "next/navigation";

interface UserProps {
    user : {
        userId : string;
        email : string;
    }
}

const AddDocumentBtn = ({user : {userId, email}} : UserProps) => {

    const router = useRouter();

    const addDocumentHandler = async () => {
        try {
            const room = await createDocument({userId, email});

            if(room) router.push(`documents/${room.id}`)

        }catch(err) {
            console.log(err)
        }
    }

    return <button
    onClick={addDocumentHandler}
    className="flex-items text-sm gap-[2px] px-2 py-1 bg-blue-500 rounded-md">
        <Image src={assets.add} alt="" width={20} height={20} />
        <span className="hidden md:block">Start a blank document</span>
    </button>
}

export default AddDocumentBtn