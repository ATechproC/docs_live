"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Header from "./Header";
import { Loader } from "lucide-react";
import Image from "next/image";
import { assets } from "@/constants";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";
import { useEffect, useState } from "react";
import { updateDocument } from "@/lib/actions/room.action";

const CollaborativeRoom = ({
    roomId,
    roomMetadata,
    currentUserType,
    users
}: CollaborativeRoomProps) => {
    const [inputValue, setInputValue] = useState(roomMetadata.title);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const handleEditing = () => {
        setIsDisabled(false);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        localStorage.title = e.target.value;
    };

    useEffect(() => {
        if (!isDisabled) {
            const input = document.getElementById("input");
            if (input) input.focus();
        }
    }, [isDisabled]);

    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            // setLoading(true);

            try {
                if (inputValue !== roomMetadata.title) {
                    const updatedDocument = await updateDocument(roomId, inputValue);

                    if (updatedDocument) {
                        setIsDisabled(true);
                    }
                }
            } catch (error) {
                console.error(error);
            }

            // setLoading(false);
        }
    }

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header className="w-[40%] ml-16 flex-between">
                        <div className="flex-items gap-1">
                            <input
                                id="input"
                                value={inputValue}
                                onChange={handleChangeInput}
                                onBlur={() => setIsDisabled(true)}

                                onKeyDown={updateTitleHandler}

                                
                                disabled={isDisabled}
                                placeholder={!isDisabled ? "" : "Untitled"}
                                className="bg-transparent text-center w-fit flex-center outline-none border-none text-white"
                            />
                            <Image
                                onClick={handleEditing}
                                className="cursor-pointer"
                                src={assets.edit}
                                alt="edit"
                                height={18}
                                width={18}
                            />
                        </div>
                        <button className="flex-items gap-1 px-2 py-[2px] rounded-md bg-blue-500">
                            <Image src={assets.share} width={18} height={18} alt="" /> Share
                        </button>

                        <ActiveCollaborators />
                    </Header>
                    <Editor roomId={roomId} currentUserType={currentUserType} />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    );
};

export default CollaborativeRoom;
