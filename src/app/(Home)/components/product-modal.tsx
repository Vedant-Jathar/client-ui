"use client"

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Product, Topping } from '@/lib/types'
import Image from 'next/image'
import React, { startTransition, Suspense, useEffect, useMemo, useState } from 'react'
import { ToppingsList } from './toppings-list'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useAppDispatch } from '@/lib/store/hooks/hooks'
import { addtoCart, CartItem } from '@/lib/store/features/Cart/cartSlice'

type chosenConfig = {
    [key: string]: string
}

const ProductModal = ({ product }: { product: Product }) => {

    const dispatch = useAppDispatch()

    const [toppings, setToppings] = useState<Topping[]>([])

    const [chosenConfig, setChosenConfig] = useState<chosenConfig>(() => {
        const initial: chosenConfig = {};

        Object.entries(product.category.priceConfiguration).forEach(([key, value]) => {
            initial[key] = value.availableOptions[0]; // default to first option
        });

        return initial;
    })

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])

    const handleCheckboxCheck = (topping: Topping) => {
        const isAlreadyExisting = selectedToppings.some((element) => element._id === topping._id)

        startTransition(() => {
            if (isAlreadyExisting) {
                setSelectedToppings(prev => prev.filter(element => element._id !== topping._id))
                return
            }
            setSelectedToppings(prev => [...prev, topping])
        })

    }

    // {
    // "_id": "687b9ba78cc6886eb2f0483a",
    // "name": "Jelapeno Pizza",
    // "description": "This is the best pizza in town",
    // "image": "https://pizza-delivery-app-mern.s3.eu-north-1.amazonaws.com/3066a46c-0559-444a-897f-14b67209fcd4",
    // "priceConfiguration": {
    //     "Size": {
    //         "priceType": "base",
    //         "availableOptions": {
    //             "Small": 10,
    //             "Medium": 20,
    //             "Large": 30
    //         },
    //         "_id": "687b9ba78cc6886eb2f0483b"
    //     },
    //     "Crust": {
    //         "priceType": "additional",
    //         "availableOptions": {
    //             "Thin": 40,
    //             "Thick": 50
    //         },
    //         "_id": "687b9ba78cc6886eb2f0483c"
    //     }
    // },


    // chosenConfig: {
    //   size: "small",
    //   crust: "thin"
    // }

    // [[size, "small"], [crust, "thin"]]



    const totalPrice = useMemo(() => {

        let price = 0
        Object.entries(chosenConfig).forEach(([key, value]) => {
            Object.entries(product.priceConfiguration).forEach(([Key, Value]) => {
                if (key === Key) {
                    price += Value.availableOptions[value]
                }
            })
        })
        selectedToppings.forEach((topping: Topping) => {
            price += topping.price
        })
        return price
    }, [chosenConfig, selectedToppings, product])


    const handleAddToCart = (product: Product) => {

        const itemToAdd: CartItem = {
            product,
            chosenConfig: {
                priceConfig: chosenConfig,
                selectedToppings
            }
        }

        dispatch(addtoCart(itemToAdd))

    }

    const handleValueChange = (key: string, value: string) => {
        setChosenConfig((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    useEffect(() => {

        const fetchData = async () => {
            const toppingsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/catalog/toppings?tenantId=7`)

            const toppingsList = await toppingsResponse.json()

            setToppings(toppingsList)
        }
        fetchData()
    }, [])

    return (
        <Dialog>
            <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">Choose</DialogTrigger>

            <DialogContent className='p-0'>
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
                                            <RadioGroup
                                                defaultValue={value.availableOptions[0]} className="grid grid-cols-3 gap-4 mb-4"
                                                onValueChange={(data) => {
                                                    handleValueChange(key, data)
                                                }}
                                            >
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
                            <Suspense fallback={"Loading...."}>
                                {product.category.name === "Pizza" && <ToppingsList toppings={toppings} handleCheckboxCheck={handleCheckboxCheck} selectedToppings={selectedToppings} />}
                            </Suspense>
                        </div>

                        <div className='flex items-center justify-between mt-12'>
                            <span className='font-semibold'>&#8377;{totalPrice}</span>
                            <Button onClick={() => {
                                handleAddToCart(product)
                            }}>
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