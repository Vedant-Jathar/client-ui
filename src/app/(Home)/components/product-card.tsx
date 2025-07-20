import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card"
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { Product } from '@/lib/types'
import ProductModal from './product-modal'




const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card>

            <div className='h-1/2'>
                <CardHeader className='flex items-center justify-center'>
                    <Image alt="pizza_image" src={product.image} width={150} height={150} />
                </CardHeader>
            </div>

            <div className='h-1/2'>
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
                        <span className='ml-[5px]'>₹400</span>
                    </p>

                    <ProductModal product={product}/>

                </CardFooter>
            </div>

        </Card>
    )
}

export default ProductCard