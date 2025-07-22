"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Tenant } from '@/lib/types'
import { useRouter } from 'next/navigation'

const TenantSelect = ({ tenants }: { tenants: Tenant[] }) => {
    const router = useRouter()
    const handleTenantChange = (value: string) => {
        router.push(`/?restaurant=${value}`)
    }

    return (
        <Select
            onValueChange={handleTenantChange}
        >
            <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
                {
                    tenants.map((tenant: Tenant) => {
                        return (
                            <SelectItem key={tenant.id} value={tenant.id}>{tenant.name}</SelectItem>
                        )
                    })
                }

            </SelectContent>
        </Select>
    )
}

export default TenantSelect