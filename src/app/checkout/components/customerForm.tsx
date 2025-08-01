"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Coins, CreditCard } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import OrderSummary from './orderSummary'
import { useQuery } from '@tanstack/react-query'
import { getCustomer } from '@/lib/http-client/api'
import { Customer } from '@/lib/types'
import AddAddress from './addAddress'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/lib/store/hooks/hooks'
import { stat } from 'fs'

const formSchema = z.object({
    address: z.string("Please select an address"),
    paymentMode: z.string("Please select a Payment mode"),
    comment: z.any()
})

const CustomerForm = () => {
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const [couponCode, sesCouponCode] = useState("")

    const cart = useAppSelector(state => state.cart)

    const handleCouponCode = (value: string) => {
        sesCouponCode(value)
    }

    const { data: customerData, isLoading } = useQuery({
        queryKey: ['getCustomer'],
        queryFn: getCustomer,
    })

    const searchParams = useSearchParams()

    const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
        const tenantId = searchParams.get("restaurant")
        const orderData = {
            ...data,
            cart: cart.cartItems,
            couponCode,
            tenantId,
            customerId: (customerData?.data as Customer)?._id
        }
        console.log("orderData", orderData);
    }

    if (isLoading) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className='flex container gap-6 mt-16'>
                    <Card className='w-3/5 border-none'>
                        <CardHeader>
                            <CardTitle className='text-[20px]'>Customer details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid gap-6'>
                                <div className='grid gap-3'>
                                    <Label htmlFor='firstName'>First Name</Label>
                                    <Input
                                        id='firstName'
                                        name='firstName'
                                        type='text'
                                        className='w-full'
                                        defaultValue={(customerData?.data as Customer)?.firstName}
                                        disabled
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <Label htmlFor='lastName'>Last Name</Label>
                                    <Input
                                        id='lastName'
                                        name='lastName'
                                        type='text'
                                        className='w-full'
                                        defaultValue={(customerData?.data as Customer)?.lastName}
                                        disabled
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='text'
                                        className='w-full'
                                        defaultValue={(customerData?.data as Customer)?.email}
                                        disabled
                                    />
                                </div>

                                <div className='grid gap-3'>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <Label htmlFor='name'>Address</Label>
                                            <AddAddress customerId={(customerData?.data as Customer)._id} />
                                        </div>

                                        <FormField
                                            name='address'
                                            control={customerForm.control}
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                className='grid grid-cols-2 gap-6 mt-2'>
                                                                {
                                                                    (customerData?.data as Customer)?.addresses.map(
                                                                        (address) => {
                                                                            return (
                                                                                <Card
                                                                                    className='p-6'
                                                                                    key={address.text}>
                                                                                    <div className='flex items-center space-x-2'>
                                                                                        <FormControl>
                                                                                            <RadioGroupItem
                                                                                                value={address.text}
                                                                                                id={address.text}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <Label htmlFor={address.text} className='leading-normal font-normal tracking-wide'>
                                                                                            {address.text}
                                                                                        </Label>
                                                                                    </div>
                                                                                </Card>
                                                                            )

                                                                        }
                                                                    )
                                                                }


                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className='grid gap-3'>
                                    <Label>Payment Mode</Label>
                                    <FormField
                                        name="paymentMode"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className='flex gap-6'
                                                        >
                                                            <div className='w-36'>
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={"card"}
                                                                        id={"card"}
                                                                        className='peer sr-only'
                                                                        aria-label={"card"} />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={"card"}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <CreditCard size={"20"} />
                                                                    <span className='ml-2'>
                                                                        Card
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                            <div className='w-36'>
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={"cash"}
                                                                        id={"cash"}
                                                                        className='peer sr-only'
                                                                        aria-label={"cash"} />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={"cash"}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <Coins size={"20"} />
                                                                    <span className='ml-2'>
                                                                        Cash
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />

                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className='grid gap-3'>
                                    <Label htmlFor=''>Comment</Label>
                                    <FormField
                                        name='comment'
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    <OrderSummary handleCouponCode={handleCouponCode} />
                </div>

            </form>
        </Form>
    )
}

export default CustomerForm