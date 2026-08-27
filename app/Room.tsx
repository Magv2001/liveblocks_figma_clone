"use client";

import { ReactNode } from "react";
import { LiveMap } from "@liveblocks/client";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { generateRandomName } from "@/lib/generateRandomName";

export function Room({ children }: { children: ReactNode }) {
    return (
        <LiveblocksProvider
            publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
            resolveUsers={async ({ userIds }) => {
                // no tenemos autenticación real, así que generamos
                // un nombre y avatar consistentes a partir del userId
                return userIds.map((userId) => ({
                    name: generateRandomName(userId),
                    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${userId}`,
                }));
            }}
        >
        <RoomProvider 
            id="my-room" 
            initialPresence={{
                cursor: null, cursorColor: null, editingText: null
            }}
            initialStorage={{
                canvasObjects: new LiveMap(),
            }}
        >
            <ClientSideSuspense fallback={<Loader />}>
            {children}
            </ClientSideSuspense>
        </RoomProvider>
        </LiveblocksProvider>
    );
}
