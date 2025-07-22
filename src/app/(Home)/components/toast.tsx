import { CheckCircle, CircleX } from 'lucide-react'
import React from 'react'

type props = {
    type: string,
    message: string
}

const Toast = ({ type, message }: props) => {
    return (
        <div className='flex items-center justify-center gap-2'>
            {type === "success" && <CheckCircle className='text-green-500' />}
            {type === "failure" && <CircleX className='text-red-500' />}
            <p className='font-semibold text-[15px]'>{message}</p>
        </div >
    )
}

export default Toast