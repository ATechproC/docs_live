"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Header from "./Header";
import Image from "next/image";
import { assets } from "@/constants";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";
import { useEffect, useRef, useState } from "react";
import { updateDocument } from "@/lib/actions/room.action";
import ShareModal from "./ShareModal";
import Loader from "./Loader";

const CollaborativeRoom = ({
    roomId,
    roomMetadata,
    currentUserType,
    users
}: CollaborativeRoomProps) => {
    const [inputValue, setInputValue] = useState(roomMetadata.title);

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const myRef = useRef(null);

    const handleEditing = () => {
        setIsDisabled(false);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        localStorage.title = e.target.value;
    };

    useEffect(() => {
        const input = document.getElementById("input");
        if (!isDisabled) {
            if (input) input.focus();
        }
    }, [isDisabled]);

    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {

            setIsLoading(true);

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

            setIsLoading(false);

        }
    }

    const handleBlur = async () => {
        setIsLoading(true);

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

        setIsLoading(false);
    }

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header className="w-[40%] gap-10 -ml-12 -mt-3 flex-between">
                        <div className="relative flex-items gap-1 sm:-ml-10 w-[120px]">
                            <input
                                id="input"
                                ref={myRef}
                                value={inputValue}
                                onChange={handleChangeInput}
                                onBlur={() => {
                                    setIsDisabled(true);
                                    handleBlur();
                                }}

                                onKeyDown={updateTitleHandler}

                                disabled={isDisabled}
                                placeholder={!isDisabled ? "" : "Untitled"}
                                className="bg-transparent text-center w-[100px] flex-center outline-none border-none text-white sm:-mr-5"
                            />
                            <div
                                className="absolute max-sm:-right-5 right-0 top-[50%] -translate-y-[50%]"
                            >
                                {isLoading ?
                                    <span className="md:-mr-10 -mr-2 text-sm text-[#B4C6EE] text-[13px] max-sm:relative max-sm:top-3.5 max-sm:left-0">saving...</span>
                                    :
                                    <Image
                                        onClick={handleEditing}
                                        className="cursor-pointer"
                                        src={assets.edit}
                                        alt="edit"
                                        height={18}
                                        width={18}
                                    />
                                }
                            </div>
                        </div>

                        <ShareModal
                            roomId={roomId}
                            collaborators={users}
                            creatorId={roomMetadata.creatorId}
                            currentUserType={currentUserType}
                        />
                        <ActiveCollaborators />
                    </Header>
                    <Editor roomId={roomId} currentUserType={currentUserType} />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    );
};

export default CollaborativeRoom;
