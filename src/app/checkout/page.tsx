import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'
import CustomerForm from './components/customerForm'

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
            <div className='pb-25'>
                <CustomerForm />
            </div>

        </>
    )
}

export default Checkout