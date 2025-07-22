"use client"

// This component has been made because "ssr:false" can only be done in a client component
// So i make a component ssr:false and then wrap it around a client component and export it.

import dynamic from 'next/dynamic'
import React from 'react'

const CounterComponentWithoutSSR = dynamic(() => import("./cart-counter"), { ssr: false })

const ClientCounterComponent = () => {
    return (
        <CounterComponentWithoutSSR />
    )
}

export default ClientCounterComponent