"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const CounterComponentWithoutSSR = dynamic(() => import("./cart-counter"), { ssr: false })

const ClientCounterComponent = () => {
    return (
        <CounterComponentWithoutSSR />
    )
}

export default ClientCounterComponent