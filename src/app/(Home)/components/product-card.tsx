import { Product } from '@/app/types'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card"
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToppingsList } from './toppings-list'

const toppings = [
    {
        _id: "1",
        name: "Cheese",
        price: 50,
        image: "/cheese.png"
    },
    {
        _id: "2",
        name: "Chicken",
        price: 70,
        image: "/chicken.png"
    },
    {
        _id: "3",
        name: "Jelapeno",
        price: 80,
        image: "/jelapeno.png"
    },
]


const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card>
            <CardHeader className='flex items-center justify-center'>
                <Image alt="pizza_image" src={product.image} width={150} height={150} />
            </CardHeader>
            <CardContent>
                <h2 className='text-xl font-semibold'>{product.name}</h2>
                <p className='mt-2 truncate cursor-default'>{product.description}</p>
                <Tooltip>
                    <TooltipTrigger>
                        <p className='text-orange-400 text-[15px]'>Show description</p>
                    </TooltipTrigger>
                    <TooltipContent className='bg-orange-400'>
                        <p className='text-[15px]'>
                            {product.description}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
                <p>
                    <span>From</span>
                    <span className='ml-[5px]'>₹{product.price}</span>
                </p>
                <Dialog>
                    <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">Choose</DialogTrigger>
                    <DialogContent className='max-w-3xl p-0'>
                        <div className='flex'>
                            <div className='w-1/3 flex items-center justify-center p-6 bg-white rounded'>
                                <Image alt='' width={450} height={450} src={'/pizza-main.png'} />
                            </div>
                            <div className='w-2/3 p-6'>
                                <h3 className='font-semibold text-xl'>{product.name}</h3>
                                <p className='mt-2'>{product.description}</p>

                                <div className='mt-6 mb-4'>
                                    <h4 className='mb-2'>Choose the size</h4>
                                    <RadioGroup defaultValue="small" className="grid grid-cols-3 gap-4">
                                        <div>
                                            <RadioGroupItem value="small" id="small" className="peer sr-only" />
                                            <Label
                                                htmlFor="small"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-300 [&:has([data-state=checked])]:border-primary"
                                            >

                                                small
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="medium"
                                                id="medium"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="medium"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-300 [&:has([data-state=checked])]:border-primary"
                                            >
                                                medium
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem value="large" id="large" className="peer sr-only" />
                                            <Label
                                                htmlFor="large"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-300 [&:has([data-state=checked])]:border-primary"
                                            >
                                                large
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className='mb-4'>
                                    <h4 className='mb-2'>Choose the crust</h4>
                                    <RadioGroup defaultValue="thick" className="grid grid-cols-3 gap-4">
                                        <div>
                                            <RadioGroupItem value="thin" id="thin" className="peer sr-only" />
                                            <Label
                                                htmlFor="thin"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-300 [&:has([data-state=checked])]:border-primary"
                                            >

                                                thin
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="thick"
                                                id="thick"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="thick"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-300 [&:has([data-state=checked])]:border-primary"
                                            >
                                                thick
                                            </Label>
                                        </div>

                                    </RadioGroup>
                                </div>

                                <div>
                                    <ToppingsList toppings={toppings} />
                                </div>

                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </CardFooter>
        </Card>
    )
}

export default ProductCard