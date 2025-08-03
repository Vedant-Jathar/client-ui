"use client"
import { Step, Stepper, useStepper } from '@/components/stepper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api, getSingleOrder } from '@/lib/http-client/api'
import { Order } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { Check, Dot } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const orderStatusMapping = {
    "received": 0,
    "confirmed": 1,
    "prepared": 2,
    "out-for-delivery": 3,
    "delivered": 4
} as { [key: string]: number }

const StepperChanger = ({ orderId }: { orderId: string }) => {
    const { setStep, nextStep } = useStepper()

    const { data } = useQuery<Order>({
        queryKey: ["getSingleOrderByPolling"],
        queryFn: async () => {
            return await api.get<Order>(`/api/order/orders/${orderId}?fields=orderStatus`).then(res => res.data)
        },
        refetchInterval: 10 * 1000
    })

    useEffect(() => {
        const currentStep = orderStatusMapping[(data as Order)?.orderStatus as string] || 0
        setStep(currentStep + 1)
    }, [data])

    return <></>
}

const SingleOrder = () => {

    const { orderId } = useParams()

    const { data: orderData } = useQuery({
        queryKey: ["getSingleOrder"],
        queryFn: async () => {
            return await getSingleOrder(orderId as string).then(res => res.data)
        }
    })

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
                    <Stepper variant='circle-alt' initialStep={0} checkIcon={Check} steps={steps}>
                        {steps.map(({ label, description }) => {
                            return (
                                <Step key={label} icon={Dot} checkIcon={Check} label={label} description={description}></Step>
                            )
                        })}
                        <StepperChanger orderId={orderId as string} />
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
                        <p className='font-semibold mb-2'>{`${(orderData as Order)?.customerId.firstName} ${(orderData as Order)?.customerId.lastName}`}</p>
                        <p>{(orderData as Order)?.address}</p>
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
                            <span>{(orderData as Order)?._id}</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Restaurant:</span>
                            <span>{(orderData as Order)?.tenantId}</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Payment Status:</span>
                            <span>{(orderData as Order)?.paymentStatus.toUpperCase()}</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Payment Mode:</span>
                            <span>{(orderData as Order)?.paymentMode.toUpperCase()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SingleOrder