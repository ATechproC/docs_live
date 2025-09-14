"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface DeleteModalProviderProps {
    isOpen : boolean;
    setIsOpen:  Dispatch<SetStateAction<boolean>>
    roomId : string;
    setRoomId : Dispatch<SetStateAction<string>>;
}

const DeleteModalContext = createContext({} as DeleteModalProviderProps)

const DeleteModalProvider = ({children} : {children : React.ReactNode}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [roomId, setRoomId] = useState<string>("")

    return <DeleteModalContext.Provider value={{isOpen, setIsOpen, roomId, setRoomId}}>
        {children}
    </DeleteModalContext.Provider>
}

export default DeleteModalProvider

export const useDeleteModal = () => {
    return useContext(DeleteModalContext);
}