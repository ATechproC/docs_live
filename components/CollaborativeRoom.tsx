"use client";

import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Header from "./Header";
import { Loader } from "lucide-react";
import Image from "next/image";
import { assets } from "@/constants";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";

const CollaborativeRoom = ({roomId, roomMetadata} : CollaborativeRoomProps) => {
    return <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader />}>
            <div className="collaborative-room">
                <Header className="w-[40%] ml-16 flex-between">
                    <div className="flex-items gap-1">
                        Untitled <Image className="cursor-pointer" src={assets.edit} alt="edit" height={18} width={18} />
                    </div>
                    <button className="flex-items gap-1 px-2 py-[2px] rounded-md bg-blue-500">
                        <Image src={assets.share} width={18} height={18} alt="" /> Share
                    </button>

                    <ActiveCollaborators />

                </Header>
                <Editor />
            </div>
        </ClientSideSuspense>
    </RoomProvider>
};

export default CollaborativeRoom;
