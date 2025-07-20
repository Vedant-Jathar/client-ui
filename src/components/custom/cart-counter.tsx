"use client"
import { increment } from '@/lib/store/features/Cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartCounter = () => {
    const dispatch = useAppDispatch()
    // This component has subscribed to only the "state.cart.value".
    const value = useAppSelector((state) => state.cart.value)
    const handleClick = () => {
        dispatch(increment())
    }
    return (
        <div className='relative'>
            <Link href={"/cart"}>
                <ShoppingCart className='hover:text-primary' />
            </Link>
            <div className='absolute -top-4 -right-5 text-white bg-orange-600 rounded-full h-6 w-6 flex items-center font-bold justify-center'>
                {value}
            </div>
            <button onClick={handleClick}>Increment</button>
        </div>
    )
}

export default CartCounter