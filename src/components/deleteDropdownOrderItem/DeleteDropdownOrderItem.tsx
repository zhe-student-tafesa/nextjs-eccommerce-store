"use client"

import React, { useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { toggleProductAvailability } from '@/lib/actions/action_admin'
import { useRouter } from 'next/navigation'
import { deleteUser } from '@/lib/actions/action_users'
import { deleteOrder } from '@/lib/actions/action_orders'

/// if we have order in this product, we should not delete this product
const DeleteDropdownOrderItem = ({ orderId }: { orderId: string }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteOrder(orderId)
                    /// refresh page: like setState
                    router.refresh()
                })
            }}>
            Delete
        </DropdownMenuItem>
    )
}

export default DeleteDropdownOrderItem