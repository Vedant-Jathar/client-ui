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
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks'
import { addtoCart, CartItem } from '@/lib/store/features/Cart/cartSlice'
import CryptoJS from 'crypto-js'
import { toast } from 'sonner'
import Toast from './toast'

type chosenConfig = {
    [key: string]: string
}

const ProductModal = ({ product }: { product: Product }) => {

    // CartItem:
    //  { product: {
    //       _id: '68765ccac09900475ba13a1e',
    //       name: 'Smoky Chicken pizza',
    //       description: 'This is never seen before epizza',
    //       image: 'https://pizza-delivery-app-mern.s3.eu-north-1.amazonaws.com/4e63a6ec-e0f0-4640-aa9a-7ab74bbc1256',
    //       priceConfiguration: {
    //         Size: {
    //           priceType: 'base',
    //           availableOptions: {
    //             Small: 1,
    //             Medium: 2,
    //             Large: 3
    //           },
    //           _id: '687cc010c97b73ded2cbf968'
    //         },
    //         Crust: {
    //           priceType: 'additional',
    //           availableOptions: {
    //             Thin: 3,
    //             Thick: 4
    //           },
    //           _id: '687cc010c97b73ded2cbf969'
    //         }
    //       },
    //       attributes: [
    //         {
    //           name: 'isHit',
    //           value: 'Yes',
    //           _id: '687cc010c97b73ded2cbf965'
    //         },
    //         {
    //           name: 'Alcohol',
    //           value: 'Non-Alcoholic',
    //           _id: '687cc010c97b73ded2cbf966'
    //         },
    //         {
    //           name: 'Spiciness',
    //           value: 'Hot',
    //           _id: '687cc010c97b73ded2cbf967'
    //         }
    //       ],
    //       tenantId: 6,
    //       categoryId: '687544aadf99f9663ee0346f',
    //       isPublished: true,
    //       createdAt: '2025-07-15T13:51:06.487Z',
    //       updatedAt: '2025-07-20T10:08:16.241Z',
    //       __v: 0,
    //       category: {
    //         _id: '687544aadf99f9663ee0346f',
    //         name: 'Pizza',
    //         priceConfiguration: {
    //           Size: {
    //             priceType: 'base',
    //             availableOptions: [
    //               'Small',
    //               'Medium',
    //               'Large'
    //             ],
    //             _id: '687544aadf99f9663ee03470'
    //           },
    //           Crust: {
    //             priceType: 'additional',
    //             availableOptions: [
    //               'Thin',
    //               'Thick'
    //             ],
    //             _id: '687544aadf99f9663ee03471'
    //           }
    //         },
    //         attributes: [
    //           {
    //             name: 'isHit',
    //             widgetType: 'switch',
    //             availableOptions: [
    //               'Yes',
    //               'No'
    //             ],
    //             defaultValue: 'No',
    //             _id: '687544aadf99f9663ee03472'
    //           },
    //           {
    //             name: 'Spiciness',
    //             widgetType: 'radio',
    //             availableOptions: [
    //               'Less',
    //               'Medium',
    //               'Hot'
    //             ],
    //             defaultValue: 'Medium',
    //             _id: '687544aadf99f9663ee03473'
    //           }
    //         ],
    //         createdAt: '2025-07-14T17:55:54.183Z',
    //         updatedAt: '2025-07-14T17:55:54.183Z',
    //         __v: 0
    //       }
    //     },
    //     chosenConfig: {
    //       priceConfig: {
    //         Size: 'Small',
    //         Crust: 'Thin'
    //       },
    //       selectedToppings: []
    //     }
    //   },

    const [dialogOpen, setDialogOpen] = useState(false)



    const dispatch = useAppDispatch()

    const cartItems = useAppSelector(state => state.cart.cartItems)

    const [toppings, setToppings] = useState<Topping[]>([])

    const [chosenConfig, setChosenConfig] = useState<chosenConfig>(() => {
        const initial: chosenConfig = {};

        Object.entries(product.category.priceConfiguration).forEach(([key, value]) => {
            initial[key] = value.availableOptions[0]; // default to first option
        });

        return initial;
    })

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])

    console.log("selectedToppings", selectedToppings);

    const handleCheckboxCheck = (topping: Topping) => {
        const isAlreadyExisting = selectedToppings.some((element) => element._id === topping._id)

        startTransition(() => {
            if (isAlreadyExisting) {
                setSelectedToppings(prev =>
                    prev.filter(element => element._id !== topping._id).sort((a, b) => a.name.localeCompare(b.name))
                )
                return
            }
            setSelectedToppings(prev => [...prev, topping].sort((a, b) => a.name.localeCompare(b.name)))
        })
    }

    const alreadyInCart = useMemo(() => {
        const currentConfig: CartItem = {
            product,
            chosenConfig: {
                priceConfig: chosenConfig,
                selectedToppings
            }
        }
        const currentConfigString = JSON.stringify(currentConfig)
        const hash = CryptoJS.SHA256(currentConfigString).toString()

        console.log("currentConfig", currentConfig);

        console.log("alreadyInCart:", cartItems.some((cartItem) => cartItem.hash === hash));
        console.log("hash", hash);

        return cartItems.some((cartItem) => cartItem.hash === hash)

    }, [chosenConfig, selectedToppings, product, cartItems])

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
        setSelectedToppings([])
        setDialogOpen(false)

        toast(<Toast type='success' message='Added to Cart' />)
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
        <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    setSelectedToppings([])
                }
                setDialogOpen(prev => !prev)
            }
            }>
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
                                {product.category.hasToppings && <ToppingsList toppings={toppings} handleCheckboxCheck={handleCheckboxCheck} selectedToppings={selectedToppings} />}
                            </Suspense>
                        </div>

                        <div className={`flex items-center justify-between mt-12`}>
                            <span className='font-semibold'>&#8377;{totalPrice}</span>
                            <Button
                                className={`${alreadyInCart ? "bg-gray-600" : "bg-primary"}`}
                                disabled={alreadyInCart}
                                onClick={() => {
                                    handleAddToCart(product)
                                }}>
                                <ShoppingCart />
                                <span>{alreadyInCart ? "Already in Cart" : "Add to Cart"}</span>
                            </Button>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal