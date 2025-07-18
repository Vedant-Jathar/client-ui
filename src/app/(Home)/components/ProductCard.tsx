import { Product } from '@/app/types'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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
                <Button className="bg-orange-200 hover:bg-orange-300 text-orange-600 py-2 px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">Choose</Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard