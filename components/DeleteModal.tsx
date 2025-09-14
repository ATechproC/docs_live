"use client";

import { assets } from '@/constants'
import { deleteDocument } from '@/lib/actions/room.action';
import { useDeleteModal } from '@/providers/DeleteModalProvider';
import Image from 'next/image'
import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react'

const DeleteModal = () => {

    const { isOpen, setIsOpen, roomId } = useDeleteModal();

    const [isLoading, setIsLoading] = useState(false)

    const pathName = usePathname();

    
    const deleteDocumentHandler = async () => {
        
        setIsLoading(true);

        try {
            await deleteDocument(roomId);
            setIsOpen(false);
        } catch (error) {
            console.log("Error notif:", error);
        }finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={`${isOpen ? "open" : "close"} fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur`} ></div>
            <div className={` ${isOpen ? "open" : "close"} fixed w-[280px] rounded-md flex flex-col gap-3  px-4 py-2 bg-dark-2 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]`}>
                <div className='flex-between w-full'>
                    <Image
                        src={assets.deleteModal} width={40} height={40} alt="" />
                    <Image
                        onClick={() => setIsOpen(false)}
                        className='cursor-pointer' src={assets.close} width={25} height={25} alt="" />
                </div>
                <p className='font-semibold text-white'>Delete document</p>
                <p className='text-sm text-[#B4C6EE]'>Are you sure you want to delete this document? This action cannot be undone.</p>
                <div className='w-full flex-between gap-1'>
                    <button 
                    onClick={() => setIsOpen(false)}
                    className={`bg-dark-3 w-[50%] px-3 py-1 rounded-lg`}>Cancel</button>
                    <button
                    onClick={deleteDocumentHandler}
                    className={`${isLoading ? "opacity-60 cursor-not-allowed " : "opacity-1 cursor-pointer" } bg-[#EF4444]  w-[50%] px-3 py-1 rounded-lg`}>
                        {isLoading ? "deleting..." : "Delete" }
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteModal