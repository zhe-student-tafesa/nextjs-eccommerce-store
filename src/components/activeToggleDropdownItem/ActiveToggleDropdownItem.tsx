"use client"

import React, { useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { toggleProductAvailability } from '@/lib/actions/action_admin'


const ActiveToggleDropdownItem = ({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) => {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem 
        disabled={isPending}
        onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailableForPurchase)
            })
        }}>
            {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
    )
}

export default ActiveToggleDropdownItem