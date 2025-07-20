'use client'

import { useState } from "react"
import { ToppingCard } from "./topping-card"
import { Topping } from "@/lib/types"

export const ToppingsList = ({ toppings }: { toppings: Topping[] }) => {

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])

    const handleCheckboxCheck = (topping: Topping) => {
        const isAlreadyExisting = selectedToppings.some((element) => element._id === topping._id)
        if (isAlreadyExisting) {
            setSelectedToppings(prev => prev.filter(element => element._id !== topping._id))
            return
        }
        setSelectedToppings(prev => [...prev, topping])
    }

    return (
        <>
            <h4 className="mb-2">Extra Toppings</h4>
            <div className="grid grid-cols-3 gap-4">
                {
                    toppings.map(topping => {
                        return <ToppingCard
                            key={topping._id}
                            topping={topping}
                            handleCheckboxCheck={handleCheckboxCheck}
                            selectedToppings={selectedToppings}
                        />
                    })
                }
            </div>
        </>
    )

}