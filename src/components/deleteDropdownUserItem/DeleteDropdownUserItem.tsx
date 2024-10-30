"use client"

import React, { useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { toggleProductAvailability } from '@/lib/actions/action_admin'
import { useRouter } from 'next/navigation'
import { deleteUser } from '@/lib/actions/action_users'

/// if we have order in this product, we should not delete this product
const DeleteDropdownUserItem = ({ userId }: { userId: string }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteUser(userId)
                    /// refresh page: like setState
                    router.refresh()
                })
            }}>
            Delete
        </DropdownMenuItem>
    )
}

export default DeleteDropdownUserItem