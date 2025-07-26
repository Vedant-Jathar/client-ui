import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

const Checkout = async ({ searchParams }: { searchParams: { restaurant: string } }) => {

    const sParams = new URLSearchParams(searchParams)
    const existingQueryParamsStr = sParams.toString()


    sParams.append("return-to", `/checkout?${existingQueryParamsStr}`)
    
    console.log("sParams", sParams);

    const session = await getSession()

    if (!session) {
        return redirect(`/login?${sParams}`)
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