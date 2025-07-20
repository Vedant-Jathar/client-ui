"use client"

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Product, Topping } from '@/lib/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToppingsList } from './toppings-list'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

const ProductModal = ({ product }: { product: Product }) => {
    // const toppings = [
    //     {
    //         _id: "1",
    //         name: "Cheese",
    //         price: 50,
    //         image: "/cheese.png"
    //     },
    //     {
    //         _id: "2",
    //         name: "Chicken",
    //         price: 70,
    //         image: "/chicken.png"
    //     },
    //     {
    //         _id: "3",
    //         name: "Jelapeno",
    //         price: 80,
    //         image: "/jelapeno.png"
    //     },
    // ]

    const [toppings, setToppings] = useState<Topping[]>([])

    const handleAddToCart = () => {
        console.log("Adding to cart");
    }

    useEffect(() => {

        const fetchData = async () => {
            const toppingsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/catalog/toppings?tenantId=7`)

            const toppingsList = await toppingsResponse.json()

            console.log("toppingsList", toppingsList);

            setToppings(toppingsList)
        }

        

        fetchData()
    }, [])

    return (
        <Dialog>
            <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">Choose</DialogTrigger>
            <DialogContent className='max-w-3xl p-0'>
                <div className='flex'>
                    <div className='w-1/3 flex items-center justify-center p-6 bg-white rounded'>
                        <Image alt='' width={450} height={450} src={product.image} />
                    </div>
                    <div className='w-2/3 p-6'>
                        <h3 className='font-semibold text-xl'>{product.name}</h3>
                        <p className='mt-2'>{product.description}</p>

                        <div className='mt-6 mb-4'>

                            {
                                Object.entries(product.category.priceConfiguration).map(([key, value]) => {
                                    return (
                                        <div key={key}>
                                            <h4 className='mb-2'>Choose the {key}</h4>
                                            <RadioGroup defaultValue="small" className="grid grid-cols-3 gap-4 mb-4">
                                                {
                                                    value.availableOptions.map((option) => {
                                                        return (
                                                            <div key={option}>
                                                                <RadioGroupItem value={option} id={option} className="peer sr-only" />
                                                                <Label
                                                                    htmlFor={option}
                                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-300 [&:has([data-state=checked])]:border-primary"
                                                                >

                                                                    {option}
                                                                </Label>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </RadioGroup>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div>
                            <ToppingsList toppings={toppings} />
                        </div>

                        <div className='flex items-center justify-between mt-12'>
                            <span className='font-semibold'>&#8377;500</span>
                            <Button onClick={handleAddToCart}>
                                <ShoppingCart />
                                <span>Add to Cart</span>
                            </Button>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal