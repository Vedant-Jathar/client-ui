import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

const OrderSummary = () => {
  const couponCodeRef = React.useRef<HTMLInputElement>(null);

  const handleCouponValidation = () => { }


  return (
    <Card className='w-2/5 border-none h-auto self-start'>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 pt-6'>
        <div className='flex items-center justify-between'>
          <span>Subtotal</span>
          <span className='font-semibold'>₹ 1000</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Taxes</span>
          <span className='font-semibold'>₹ 200</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Delivery charges</span>
          <span className='font-semibold'>₹ 50</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Discount</span>
          <span className='font-semibold'>₹ 120</span>
        </div>
        <hr />

        <div className='flex items-center justify-between'>
          <span className='font-semibold'>Order Total</span>
          <span className='font-bold'>₹ 2000</span>
          <span className='font-bold'>₹ 1800</span>
        </div>

        <div className='flex items-center gap-4'>
          <Input
            id='coupon'
            name="code"
            type='text'
            className='w-full'
            placeholder='Coupon code'
            ref={couponCodeRef} />
          <Button
            onClick={handleCouponValidation}
            variant={"outline"}>
            Apply
          </Button>
        </div>

        <div className='text-right mt-6'>
          <Button>
            <span>Place order</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderSummary