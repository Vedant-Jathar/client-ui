import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cookies } from 'next/headers'
import { Order } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
const Orders = async () => {
    const cookieGetter = await cookies()
    const getOrdersResponse = await fetch(`${process.env.NEXT_BACKEND_API_BASE_URL}/api/order/orders/mine`, {
        headers: {
            Authorization: `Bearer ${cookieGetter.get("accessToken")?.value}`
        }
    })

    const orders: Order[] = await getOrdersResponse.json() || []

    return (
        <>
            <div className='container mt-10'>
                <Card className='p-5'>
                    <CardHeader>
                        <CardTitle>
                            <h1 className='text-2xl'>Order History</h1>
                            <p className='mt-3'>All of your previous orders</p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {
                            !orders.length ?
                                <>
                                    <div className='mt-5 flex flex-col items-center justify-center'>
                                        <h1 className='text-2xl'>No orders made yet</h1>
                                        <Button className='mt-5'>
                                            <Link href={"/"}>Shop now</Link>
                                        </Button>
                                    </div >
                                </> :
                                (
                                    <Table className='bg-white'>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="">Invoice</TableHead>
                                                <TableHead className='text-center'>Order Status</TableHead>
                                                <TableHead className='text-center'>Payment Status</TableHead>
                                                <TableHead className='text-center'>Payment Method</TableHead>
                                                <TableHead className='text-center'>Amount</TableHead>
                                                <TableHead className='text-center'>Date and Time</TableHead>
                                                <TableHead className='text-center'>Details</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                orders.map((order) => {
                                                    const date = new Date(order.createdAt).toLocaleString();
                                                    return (
                                                        <TableRow key={order._id}>
                                                            <TableCell>{order._id}</TableCell>
                                                            <TableCell className='text-center'>
                                                                <Badge variant={'secondary'}>
                                                                    {order.orderStatus.toUpperCase()}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className='text-center'>{order.paymentStatus.toUpperCase()}</TableCell>
                                                            <TableCell className='text-center'>{order.paymentMode}</TableCell>
                                                            <TableCell className='text-center' >Rs.{order.total}</TableCell>
                                                            <TableCell className='text-center'>{date}</TableCell>
                                                            <TableCell className='text-center' >
                                                                <Link href={`/orders/${order._id}`}>
                                                                    <Button className='cursor-pointer' variant={'link'}>More details</Button>
                                                                </Link></TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                )
                        }

                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default Orders