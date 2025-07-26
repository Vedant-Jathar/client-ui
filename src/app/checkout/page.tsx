import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

const Checkout = async ({ searchParams }: { searchParams: { restaurant: string } }) => {

    const queryString = new URLSearchParams(searchParams).toString()
    console.log("queryString", queryString);

    const session = await getSession()

    if (!session) {
        return redirect(`/login?${queryString}`)
    }

    return (
        <>
            <div>
                <div>
                    <h1>Customer details</h1>
                    <div>

                    </div>
                </div>
                <div>
                    <h1>Order Summary</h1>
                </div>
            </div>
        </>
    )
}

export default Checkout