"use client";

import { assets } from '@/constants'
import { useDeleteModal } from '@/providers/DeleteModalProvider';
import Image from 'next/image'

const CloseDeleteModal = ({roomId, className} : DeleteModalProps) => {

    const { setIsOpen, setRoomId } = useDeleteModal();

    return <span
    onClick={() => {
        setIsOpen(true);
        setRoomId(roomId);
    }}
        className={className}
    >
        <Image
            src={assets.deleteIcon}
            alt=""
            width={20}
            height={20}
        />
    </span>
}

export default CloseDeleteModal