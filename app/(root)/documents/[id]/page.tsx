// import { Editor } from '@/components/editor/Editor';
// import Header from '@/components/editor/Header';
import { metadata } from '@/app/layout';
import CollaborativeRoom from '@/components/CollaborativeRoom';
import { getDocument } from '@/lib/actions/room.action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function Document({params : {id}} : SearchParamProps) {

    const clerkUser = await currentUser();

    if(!clerkUser) redirect("/sign-in");

    const room = await getDocument({
        roomId : id,
        userId : clerkUser.emailAddresses[0].emailAddress,
    })

    if(!room) redirect("/");

    return (
        <>
            {/* <Header/> */}
            {/* <Editor /> */}
            <CollaborativeRoom 
            roomId={id} 
            roomMetadata={room.metadata}
            />
        </>
    )
}

export default Document;