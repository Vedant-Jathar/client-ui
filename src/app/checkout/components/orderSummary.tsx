

"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { verifyCoupon } from '@/lib/http-client/api';
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { verifyCouponResponse } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'

const TAXES_PERCANTAGE = 18

const OrderSummary = ({ handleCouponCode, isCreateOrderPending }: { handleCouponCode: (value: string) => void, isCreateOrderPending: boolean }) => {
  const couponCodeRef = React.useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams()
  const [couponInvalid, setCouponInvalid] = useState<boolean | null>(null)

  const [discountPercantage, setDiscountPercentage] = useState(0)

  const { mutate: verifyCouponMutate, isError } = useMutation({
    mutationKey: ['verifyCoupon'],
    mutationFn: verifyCoupon,
    onSuccess: async (response) => {
      if ((response.data as verifyCouponResponse).valid) {
        setCouponInvalid(false)
        setDiscountPercentage((response.data as verifyCouponResponse).discount)
        handleCouponCode(couponCodeRef.current ? couponCodeRef.current.value : "")
        return
      }
      if (!(response.data as verifyCouponResponse).valid) {
        setCouponInvalid(true)
        setDiscountPercentage(0)
        return
      }
    },
    onError: () => {
      setDiscountPercentage(0)
    }
  })

  const handleCouponValidation = () => {
    const code = couponCodeRef.current?.value
    const tenantId = searchParams.get("restaurant")!
    console.log({ code, tenantId });
    verifyCouponMutate({ code, tenantId })
  }

  const subTotal = useAppSelector(state => state.cart.totalCartPrice)

  const discountAmount = useMemo(() => {
    return Math.round((subTotal * discountPercantage) / 100)
  }, [discountPercantage, subTotal])

  const taxesAmount = useMemo(() => {
    return Math.round(((subTotal - discountAmount) * TAXES_PERCANTAGE) / 100)
  }, [subTotal, discountAmount])

  const DELIVERY_CHARGES = useMemo(() => {
    return subTotal <= 200 ? 50 : 0
  }, [subTotal])

  const grandTotal = useMemo(() => {
    return (subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES)
  }, [subTotal, discountAmount, taxesAmount, DELIVERY_CHARGES])

  const grandTotalWithoutDiscount = useMemo(() => {
    const taxes = Math.round((subTotal * TAXES_PERCANTAGE) / 100)
    return (subTotal + taxes + DELIVERY_CHARGES)
  }, [subTotal, DELIVERY_CHARGES])

  return (
    <Card className='w-2/5 border-none h-auto self-start'>
      <CardHeader>
        <CardTitle className='text-[20px]'>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 pt-6'>
        <div className='flex items-center justify-between'>
          <span>Subtotal</span>
          <span className='font-semibold'>₹ {subTotal}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Taxes</span>
          <span className='font-semibold'>₹ {taxesAmount}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Delivery charges</span>
          <span className='font-semibold'>₹ {DELIVERY_CHARGES}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Discount</span>
          <span className='font-semibold'>₹ {discountAmount}</span>
        </div>
        <hr />

        <div className='flex items-center justify-between'>
          <span className='font-semibold'>Order Total</span>

          <div className='text-[19px]'>
            {
              discountPercantage ?
                <span className='font-semibold line-through mr-2 text-gray-500 text-[15px]'>₹ {grandTotalWithoutDiscount}</span> : null
            }
            <span className='font-bold text-green-700'>₹{grandTotal}</span>
          </div>


        </div>

        <div className='flex items-center gap-4 mt-5'>
          <Input
            id='coupon'
            name="code"
            type='text'
            className='w-full'
            placeholder='Coupon code'
            ref={couponCodeRef} />
          <Button
            type='button'
            onClick={handleCouponValidation}
            variant={"outline"}>
            Apply
          </Button>

        </div>

        {(couponInvalid || isError) && <p className='text-red-700'>Invalid coupon</p>}
        {(couponInvalid === false && !isError) && <p className='text-green-700'>Coupon Applied!</p>}
        <div className='text-right mt-3'>
          <Button disabled={isCreateOrderPending}>
            {
              isCreateOrderPending ?
                <div className='flex items-center gap-1'>
                  <LoaderCircle className='animate-spin' />
                  <span>Please wait</span>
                </div> :
                <span>Place Order</span>
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderSummary