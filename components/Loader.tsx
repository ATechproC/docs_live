import { assets } from '@/constants'
import Image from 'next/image'

const Loader = () => {
    return (
        // <div className="flex-items flex-col gap-2 text-white absolute top-[50%] left-[50%] -translate-x-|50%] -translate-y-[50%]"
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <div className='flex-items flex-col gap-2 text-white '>
                <Image
                src={assets.loader}
                alt="loader"
                width={32}
                height={32}
                className="animate-spin"
            />
            Loading...
            </div>
        </div>
    )
}

export default Loader