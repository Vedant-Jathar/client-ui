import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ClearCart from './clear-cart'

interface CheckoutPageProps {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const Payment = async ({ searchParams }: CheckoutPageProps) => {

    const sParams = await searchParams

    return (
        <div className='mt-22 flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <CheckCircle size={42} className='text-green-500' />
                <h1 className='text-bold text-2xl'>Order placed Successfully!</h1>
                <p>Enjoy the meal</p>
            </div>
            <Card className='w-[400px] mt-4'>
                <CardHeader className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Store className='text-primary' />
                        <CardTitle className='text-[20px]'>Order Details</CardTitle>
                    </div>
                    <Badge variant={'secondary'} className='text-[15px]'>Confirmed</Badge>
                </CardHeader>
                <Separator />
                <CardContent className='flex flex-col items-center'>
                    <div className='flex items-center gap-2 text-[18px] w-full'>
                        <span className='font-semibold'>Order Id:</span>
                        <Link href={`/order/${sParams?.orderId}`} className='underline text-primary'>{sParams?.orderId}</Link>
                    </div>
                    <div className='flex items-center gap-2 mt-4 text-[18px] w-full'>
                        <span className='font-semibold'>Payment Status:</span>
                        <span>{
                            sParams?.razorpay_payment_link_status ? (sParams.razorpay_payment_link_status as string).toUpperCase() : "PENDING"}
                        </span>
                    </div>
                    <Button className='mt-8'>
                        <Link href={`/?restaurant=${sParams?.restaurant}`}>
                            <span>Order More</span>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <ClearCart />
        </div>
    )
}

export default Payment