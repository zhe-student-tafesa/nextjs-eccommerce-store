'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { formatCurrency } from '@/lib/formatters'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { addProduct } from '@/lib/actions/action_admin'
import { useFormState, useFormStatus } from 'react-dom'
import { Product } from '@prisma/client'

const ProductForm = ({ product }: { product?: Product | null }) => {
    const [priceInCents, setPriceInCents] = useState<number>()
    const [error, action] = useFormState(addProduct, {})
    return (
        <form action={action} className='space-y-8'>
            <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' id='name' name='name' required>
                </Input>
                {error.name && <div className='text-destructive'>{error.name}</div>}
            </div>


            <div className='space-y-2'>
                <Label htmlFor='priceInCents'>Price In Cents</Label>
                <Input
                    type='number'
                    id='priceInCents'
                    name='priceInCents'
                    required
                    value={priceInCents}
                    onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
                >
                </Input>
                <div className='text-muted-foreground'>
                    {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error.priceInCents && <div className='text-destructive'>{error.priceInCents}</div>}
            </div>

            <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea id='description' name='description' required />
                {error.description && <div className='text-destructive'>{error.description}</div>}
            </div>

            <div className='space-y-2'>
                <Label htmlFor='file'>File</Label>
                <Input type='file' id='file' name='file' required>
                </Input>
                {error.file && <div className='text-destructive'>{error.file}</div>}
            </div>

            <div className='space-y-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='file' id='image' name='image' required>
                </Input>
                {error.image && <div className='text-destructive'>{error.image}</div>}
            </div>

            <SubmitButton />
        </form>
    )
}

export default ProductForm

// use pending Status to disable Save Button
function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button type='submit' disabled={pending}>{pending ? 'Saving...' : "Save"}</Button>
}