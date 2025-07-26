import React from 'react'
import CartItems from './components/cart-items'
import { serialize } from 'v8'

const Cart = ({ searchParams }: { searchParams: { restaurant: string } }) => {

    const queryString = new URLSearchParams(searchParams).toString()
    console.log("queryString in Cart", queryString);

    return (
        <>
            {/* <div className='container'>
        <h1>Shopping Cart</h1>
        {cartItems.map((cartItem) => {
            return (
                <div key={cartItem.hash} className='flex gap-12 items-center justify-center'>
                    <div>
                        <Image src={cartItem.product.image} alt={cartItem.product.name} width={100} height={100} />
                    </div>
                    <div>
                        <p>{cartItem.product.name}</p>
                        {Object.entries(cartItem.chosenConfig.priceConfig).map(([key, value]) => {
                            return (
                                <p key={value}>{value}</p>
                            )
                        })}
                        {cartItem.chosenConfig.selectedToppings.map((topping) => {
                            return (
                                <p key={topping._id}>{topping.name}</p>
                            )
                        })}
                    </div>
                    <div>
                        <span>Quantity:{cartItem.qty}</span>

                    </div>
                    <div>
                        <p>Rs.{cartItem.pricePerUnit}</p>
                    </div>
                </div>
            )

        })}
             </div> */}
            <section>
                <div className='container mx-auto py-6'>
                    <h1 className='font-semibold text-2xl'>Shopping cart</h1>
                    <div className='bg-white rounded-lg p-6 mt-6'>
                        <CartItems />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart