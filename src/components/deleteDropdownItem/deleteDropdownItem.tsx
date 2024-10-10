"use client"

import React, { useTransition } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { deleteProduct, toggleProductAvailability } from '@/lib/actions/action_admin'

/// if we have order in this product, we should not delete this product
const DeleteDropdownItem = ({ id, disabled }: { id: string, disabled: boolean }) => { 
  const [isPending, startTransition] = useTransition()
  return (
      <DropdownMenuItem 
      disabled={isPending || disabled}
      onClick={() => {
          startTransition(async () => {
              await deleteProduct(id)
          })
      }}>
          Delete
      </DropdownMenuItem>
  )
}

export default DeleteDropdownItem