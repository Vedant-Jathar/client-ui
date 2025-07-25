"use client"
import FormSubmitButton from '@/components/custom/form-submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signup } from '@/lib/actions/signup'
import Image from 'next/image'
import React, { useActionState } from 'react'

const initialState = {
    type: "",
    message: ""
}

const SignUp = () => {
    const [state, formAction] = useActionState(signup, initialState)

    if (state.type === "Success") {
        window.location.href = "/"
    }

    return (
        <>
            <div className='flex items-center container mt-20'>
                <div className='w-1/2 flex items-center justify-center'>
                    <form action={formAction} className='flex flex-col items-center'>
                        <h1 className='font-semibold text-[22px] mb-8'>Signup</h1>
                        <div className='mb-4'>
                            <Label htmlFor='firstname' className='mb-2'>First Name</Label>
                            <Input type='text' name="firstName" id='firstname' className='w-[300px] bg-white' />
                        </div>
                        <div className='mb-4'>
                            <Label htmlFor='lastname' className='mb-2'>Last Name</Label>
                            <Input type='text' name="lastName" id='lastname' className='w-[300px] bg-white' />
                        </div>
                        <div className='mb-4'>
                            <Label htmlFor='email' className='mb-2'>Email</Label>
                            <Input type='email' name="email" id='email' className='w-[300px] bg-white' />
                        </div>
                        <div className='mb-8'>
                            <Label htmlFor='password' className='mb-2'>Password</Label>
                            <Input type='password' name="password" id='password' className='w-[300px] bg-white' />
                        </div>
                        {state.type === "error" && <p className='text-red-700'>{state.message}</p>}
                        <FormSubmitButton title='Signup' />
                    </form>
                </div>
                <div className='w-1/2 flex items-center justify-center'>
                    <Image src={"/login-image.webp"} width={600} height={600} alt='pizza-image' />
                </div>
            </div>
        </>
    )
}

export default SignUp