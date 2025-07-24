"use client"
import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/lib/actions/logout'
import Link from 'next/link'

const LogoutButton = () => {
    return (
        <>
            <Button onClick={async () => {
                await logout()
            }} className='w-[100px]'>
                <Link href={"/login"}>Logout</Link>
            </Button>
        </>
    )
}

export default LogoutButton