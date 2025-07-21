"use client"
import { useAppSelector } from '@/lib/store/hooks/hooks'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartCounter = () => {

    const noOfCartItems = useAppSelector((state) => state.cart.cartItems.length)

    return (
        <div className='relative'>
            <Link href={"/cart"}>
                <ShoppingCart className='hover:text-primary' />
            </Link>
            <div className='absolute -top-4 -right-5 text-white bg-orange-600 rounded-full h-6 w-6 flex items-center font-bold justify-center'>
                {noOfCartItems}
            </div>
        </div>
    )
}

export default CartCounter