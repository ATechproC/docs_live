import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SingIn = () => {
    return (
        <main className='w-full h-screen flex-center'>
            <SignIn />
        </main>
    )
}

export default SingIn