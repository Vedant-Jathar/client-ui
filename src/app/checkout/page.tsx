import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'
import CustomerForm from './components/customerForm'

interface CheckoutPageProps {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const Checkout = async ({ searchParams }: CheckoutPageProps) => {
    const SParams = await searchParams

    const sParams = new URLSearchParams(SParams as Record<string, string>)

    const existingQueryParamsStr = sParams.toString()

    sParams.append("return-to", `/checkout?${existingQueryParamsStr}`)

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