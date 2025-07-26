"use client"
import { useAppSelector } from '@/lib/store/hooks/hooks'
import Link from 'next/link'
import React from 'react'
import CartItem from './cart-item'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const CartItems = () => {
    const cartItems = useAppSelector(state => state.cart.cartItems)

    const totalCartPrice = cartItems.reduce((acc, curr) => acc + (curr.pricePerUnit! * curr.qty!), 0)

    const searchParams = useSearchParams()

    if (!cartItems.length) {
        return (
            <>
                <div>The Cart is Empty</div>
                {/* ToDO:When we are redirected to the home page then we should have that restaurant open*/}
                <Link href={`/?restaurant=11`} className='text-primary'>Shop now</Link>
            </>
        )
    }

    return (
        <div className='flex flex-col gap-8'>
            {
                cartItems.map((item) => {
                    return (
                        <CartItem key={item.hash} item={item} />
                    )
                })
            }
            <div className='flex items-center justify-between'>
                <span className='text-[22px] font-bold pl-7'>
                    <span className='mr-0.5'>&#8377;</span>
                    {totalCartPrice}
                </span>
                <Link href={`/checkout?restaurant=${searchParams.get("restaurant")}`}>
                    <Button className='text-[18px]'>
                        Checkout
                        <ArrowRight size={16} className='ml-0.5' />
                    </Button>
                </Link>

            </div>
        </div>
    )
}

export default CartItems