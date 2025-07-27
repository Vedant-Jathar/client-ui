'use client'
import { CartItem, setInitialCartItems, setTotalCartPrice } from '@/lib/store/features/Cart/cartSlice'
import { AppStore, makeStore } from '@/lib/store/store'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    // Once the store is initilized then get the cartItems from the local storage and set it in the store

    useEffect(() => {
        const cartItemsString = window.localStorage.getItem('CartItems')
        const totalCartPrice = Number(window.localStorage.getItem("totalCartPrice"))

        if (cartItemsString) {
            try {
                const parsedItems = JSON.parse(cartItemsString) as CartItem[]
                storeRef.current?.dispatch(setInitialCartItems(parsedItems))
                storeRef.current?.dispatch(setTotalCartPrice(totalCartPrice))
            } catch (error) {
                console.error('Error parsing CartItems from localStorage:', error)
            }
        }

    }, [])


    return <Provider store={storeRef.current}>{children}</Provider>
}