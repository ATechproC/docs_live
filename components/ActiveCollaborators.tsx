"use client";

import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';

const ActiveCollaborators = () => {

    const others = useOthers();

    const collaborators = others.map(item => item.info);

    return (
        <ul className='collaborators-list'>
            {collaborators.map(({id, name, avatar, color}) => {
                return <li key={id}>
                    <Image
                    src={avatar} 
                    width={35}
                    height={35}
                    alt={name}
                    className='inline-block rounded-full'
                    style={{border : `3px solid ${color}`}}
                    />
                </li>
            })}
        </ul>
    )
}

export default ActiveCollaborators