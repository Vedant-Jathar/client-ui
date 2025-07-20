'use client'

import { ToppingCard } from "./topping-card"
import { Topping } from "@/lib/types"

export type toppingListProps = {
    toppings: Topping[],
    selectedToppings: Topping[],
    handleCheckboxCheck: (topping: Topping) => void
}

export const ToppingsList = ({ toppings, selectedToppings, handleCheckboxCheck }: toppingListProps) => {



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