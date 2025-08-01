import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, CheckCircle, Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Payment = () => {
    return (
        <div className='mt-32 flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <CheckCircle size={42} className='text-green-500' />
                <h1 className='text-bold text-2xl'>Order placed Successfully!</h1>
                <p>Enjoy the meal</p>
            </div>
            <Card className='w-[500px] mt-4'>
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
                        <Link href={"/"} className='underline text-primary'>y87y87y8y</Link>
                    </div>
                    <div className='flex items-center gap-2 mt-4 text-[18px] w-full'>
                        <span className='font-semibold'>Payment Status:</span>
                        <span>Paid</span>
                    </div>
                    <Button className='mt-8'>
                        <span>Order More</span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Payment