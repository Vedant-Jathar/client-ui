"use client"
import { clearCart } from '@/lib/store/features/Cart/cartSlice'
import { useAppDispatch } from '@/lib/store/hooks/hooks'
import React, { useEffect } from 'react'

const ClearCart = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(clearCart())
    }, [dispatch])
    return (
        <>
        </>
    )
}

export default ClearCart