"use client"

import React, { useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { toggleProductAvailability } from '@/lib/actions/action_admin'
import { useRouter } from 'next/navigation'


const ActiveToggleDropdownItem = ({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem 
        disabled={isPending}
        onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailableForPurchase)
                router.refresh()
            })
        }}>
            {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
    )
}

export default ActiveToggleDropdownItem