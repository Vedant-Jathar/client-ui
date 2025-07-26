"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddAddress from './addAddress'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Coins, CreditCard } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import OrderSummary from './orderSummary'

const customer = {
    addresses: [
        {
            text: "New york"
        },
        {
            text: "Delhi"
        },
    ]
}

const formSchema = z.object({
    address: z.string().min(1, "Please select an address"),
    paymentMode: z
        .enum(["card", "cash"])
        .refine(val => val === "card" || val === "cash", {
            message: "You need to select a payment mode type"
        }),
    comment: z.any()
})

const CustomerForm = () => {
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const handlePlaceOrder = () => {

    }

    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className='flex container gap-6 mt-16'>
                    <Card className='w-3/5 border-none'>
                        <CardHeader>
                            <CardTitle>Customer details</CardTitle>
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
                                        defaultValue={"Vedant"}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <Label htmlFor='lastName'>Last Name</Label>
                                    <Input
                                        id='lastName'
                                        name='lastName'
                                        type='text'
                                        className='w-full'
                                        defaultValue={"Jathar"}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        type='text'
                                        className='w-full'
                                        defaultValue={"jathar@gmail.com"}
                                    />
                                </div>

                                <div className='grid gap-3'>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <Label htmlFor='name'>Address</Label>
                                            <AddAddress />
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
                                                                className='grid grid-col-2 gap-6 mt-2'>
                                                                {
                                                                    customer.addresses.map(
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
                                                                                        <Label htmlFor={address.text} className='leading-normal'>
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

                    <OrderSummary />
                </div>

            </form>
        </Form>
    )
}

export default CustomerForm