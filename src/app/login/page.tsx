"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useActionState } from 'react'
import { login } from '@/lib/actions/login'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const initialState = {
    type: "",
    message: ""
}

const Login = () => {
    const [state, formAction] = useActionState(login, initialState)
    // console.log("state", state);

    return (
        <div>
            <div className='container flex gap-4 p-5'>
                <div className='w-1/2 flex flex-col items-center justify-center'>
                    <h1 className='text-2xl mb-8'>Login</h1>
                    <form action={formAction} className='flex flex-col gap-4 justify-center items-center'>
                        <div>
                            <Label htmlFor='email' className='mb-2'>Email</Label>
                            <Input id="email" type='email' name='email' className='bg-white w-[300px]' />
                        </div>
                        <div>
                            <Label htmlFor='password' className='mb-2'>Password</Label>
                            <Input id="password" type='password' name='password' className='bg-white w-[300px]' />
                        </div>
                        {state.type === "error" && <p className='text-red-700'>Invalid credentials</p>}
                        <Button className='w-[300px] mt-4'>Login</Button>
                    </form>
                    <p className='mt-4'>Dont have an account?<Link href={"/signup"} className='text-primary ml-1 text-[18px]'>Signup</Link></p>
                </div>
                <div>
                    <Image src={"/login-image.webp"} width={600} height={600} alt='pizza-image' className='rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default Login