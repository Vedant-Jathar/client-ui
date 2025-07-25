"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

const FormSubmitButton = ({ title }: { title: string }) => {
    const { pending } = useFormStatus()

    return (
        <Button className='w-[300px] mt-4' disabled={pending}>
            {
                pending ?
                    <div className='flex items-center gap-2'>
                        <LoaderCircle className='animate-spin' />
                        <span>Please wait</span>
                    </div> : title
            }
        </Button>
    )
}

export default FormSubmitButton