import type { CartItem } from '@/lib/store/features/Cart/cartSlice'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import QuantityChanger from './quantity-changer'

type props = {
    item: CartItem
}

const CartItem = ({ item }: props) => {
    return (
        <div className='grid grid-cols-2'>
            <div className='flex items-center'>
                <Image src={item.product.image} width={100} height={100} alt={item.product.name} />
                <div className='flex gap-12 ml-10'>
                    <div className='flex-1 '>
                        <h2 className='font-semibold'>{item.product.name}</h2>
                        <h3>
                            {
                                Object.entries(item.chosenConfig.priceConfig).map(([key, value]) => value).join(',')
                            }
                        </h3>
                        <h3>
                            {
                                item.chosenConfig.selectedToppings.map((topping) => topping.name).join(",")
                            }
                        </h3>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <QuantityChanger item={item} />
                </div>
                <div>
                    <span className='text-[17px] font-semibold'><span className='mr-0.5'>&#8377;</span>{item.qty! * item.pricePerUnit!}</span>
                    <button className='ml-8'>X</button>
                </div>

            </div>
        </div>
    )
}

export default CartItem