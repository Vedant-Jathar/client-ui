import { Button } from '@/components/ui/button'
import { CartItem, handleQuantityChange } from '@/lib/store/features/Cart/cartSlice'
import { useAppSelector } from '@/lib/store/hooks/hooks'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

const QuantityChanger = ({ item }: { item: CartItem }) => {

    const dispatch = useDispatch()

    return (
        <div>
            <Button
                className='bg-gray-400 mr-6'
                onClick={() => { dispatch(handleQuantityChange({ hash: item.hash as string, change: -1 })) }}
            >
                <MinusIcon />
            </Button>
            <span>{item.qty}</span>
            <Button
                className='bg-gray-400 ml-6'
                onClick={() => { dispatch(handleQuantityChange({ hash: item.hash as string, change: 1 })) }}>
                <PlusIcon />
            </Button>
        </div>
    )
}

export default QuantityChanger