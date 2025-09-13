"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks_auth">
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                {children}
            </ClientSideSuspense>
        </LiveblocksProvider>
    );
}