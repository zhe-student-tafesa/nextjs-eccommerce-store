"use client"

import React, { useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { deleteProduct, toggleProductAvailability } from '@/lib/actions/action_admin'
import { useRouter } from 'next/navigation'

/// if we have order in this product, we should not delete this product
const DeleteDropdownItem = ({ id, disabled }: { id: string, disabled: boolean }) => { 
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
      <DropdownMenuItem 
      variant="destructive"
      disabled={isPending || disabled}
      onClick={() => {
          startTransition(async () => {
              await deleteProduct(id)
              /// refresh page: like setState
              router.refresh()
          })
      }}>
          Delete
      </DropdownMenuItem>
  )
}

export default DeleteDropdownItem