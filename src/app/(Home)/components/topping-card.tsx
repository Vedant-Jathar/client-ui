import { Topping } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type propTypes = {
    topping: Topping
    selectedToppings: Topping[]
    handleCheckboxCheck: (topping: Topping) => void
}

export const ToppingCard = ({ topping, handleCheckboxCheck, selectedToppings }: propTypes) => {

    const isCurrentSelected = selectedToppings.some(element => element._id === topping._id)

    return (
        <>
            <Button
                variant={"outline"}
                className={`flex relative flex-col items-center justify-center h-30 ${isCurrentSelected ? "border-primary" : ""}`}
                onClick={() => {
                    handleCheckboxCheck(topping)
                }}>
                <Image src={topping.image} width={100} height={100} alt="topping-image" />
                <h4>{topping.name}</h4>
                <h3>&#8377;{topping.price}</h3>
                {/* {isCurrentSelected && <CircleCheck className="absolute top-1 right-1 text-primary" />} */}
            </Button>
        </>
    )
}