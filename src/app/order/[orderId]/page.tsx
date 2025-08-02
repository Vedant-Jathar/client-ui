"use client"

import { Step, StepItem, Stepper } from '@/components/stepper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Check, Dot } from 'lucide-react'
import React from 'react'

const SingleOrder = () => {
    const steps = [
        {
            label: "Recieved",
            description: "Your order has been received"
        },
        {
            label: "Confirmed",
            description: "Your order is confirmed"
        },
        {
            label: "Prepared",
            description: "Your order is prepared"

        },
        {
            label: "Out for Delivery",
            description: "Your order is out for delivery"
        },
        {
            label: "Delivered",
            description: "Your order has been delivered"
        },
    ]

    return (
        <div className='container'>
            <Card className='mt-5 pb-10'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Order</CardTitle>
                    <CardDescription className='-mt-1'>Track the order status</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className='pt-5'>
                    <Stepper variant='circle-alt' initialStep={3} checkIcon={Check} steps={steps}>
                        {steps.map(({ label, description }) => {
                            return (
                                <Step key={label} icon={Dot} checkIcon={Check} label={label} description={description}></Step>
                            )
                        })}
                    </Stepper>
                </CardContent>
            </Card>

            <div className='flex mt-5 gap-5 w-full'>
                <Card className='w-1/3'>
                    <CardHeader>
                        <CardTitle>Delivery Address</CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <p>Varun valley kandivali</p>
                    </CardContent>
                </Card>
                <Card className='w-2/3'>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className='flex flex-col gap-2'>
                        <div >
                            <span className='font-medium mr-2'>Order Id:</span>
                            <span>76868998</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Restaurant:</span>
                            <span>8</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Payment Status:</span>
                            <span>Paid</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Payment Mode:</span>
                            <span>card</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SingleOrder