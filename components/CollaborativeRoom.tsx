"use client";

import {
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Header from "./Header";
import { Loader } from "lucide-react";

const CollaborativeRoom = () => {
    return <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader/>}>
        <div className="collaborative-room">
            <Header/>
        </div>
        </ClientSideSuspense>
    </RoomProvider>
};

export default CollaborativeRoom;
