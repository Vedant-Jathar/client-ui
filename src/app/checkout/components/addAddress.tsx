"use client"
import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LoaderCircle, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAddress } from '@/lib/http-client/api'
import { Span } from 'next/dist/trace'

const formSchema = z.object({
  address: z.string().min(2, "Address should be atleast 2 characters")
})

const AddAddress = ({ customerId }: { customerId: string }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const queryClient = useQueryClient()

  const { mutate: addAddressMutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["addAddress"],
    mutationFn: addAddress,
    onSuccess: async () => {
      console.log("Address added successfully", data?.data);
      addressForm.reset()
      setIsModalOpen(false)
      return queryClient.invalidateQueries({ queryKey: ["getCustomer"] })
    }
  })

  const hadleAddAddress = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation()

    return addressForm.handleSubmit((data: z.infer<typeof formSchema>) => {
      const Data = {
        ...data,
        customerId
      }
      addAddressMutate(Data)
    })(e)

  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(prev => !prev)}>
        <DialogTrigger asChild>
          <Button variant={'link'} size={'sm'}>
            <Plus className='mr-0.5' />
            <span>Add Address</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <Form {...addressForm}>
            <form onSubmit={hadleAddAddress}>
              <DialogHeader>
                <DialogTitle>
                  Add Address
                </DialogTitle>
                <DialogDescription>
                  We can save your address for next time order
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div>
                  <Label htmlFor='address'>Address</Label>
                  <FormField
                    name='address'
                    control={addressForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Textarea className='mt-2' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                  {
                    isError && <div>{error.message}</div>
                  }

                  <Button size={'sm'} className='mt-2 float-right'>
                    {
                      isPending ?
                        <span>
                          <LoaderCircle className='animate-spin' />
                          Pls Wait
                        </span> : <span>Add</span>
                    }
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddAddress