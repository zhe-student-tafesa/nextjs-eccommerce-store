'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { formatCurrency } from '@/lib/formatters'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { addProduct } from '@/lib/actions/action_admin'

const ProductForm = () => {
    const [priceInCents, setPriceInCents] = useState<number>()

    return (
        <form action={addProduct} className='space-y-8'>
            <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' id='name' name='name' required>
                </Input>
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
            </div>

            <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea id='description' name='description' required />
            </div>

            <div className='space-y-2'>
                <Label htmlFor='file'>File</Label>
                <Input type='file' id='file' name='file' required>
                </Input>
            </div>

            <div className='space-y-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='file' id='image' name='image' required>
                </Input>
            </div>

            <Button type='submit'>Save</Button>
        </form>
    )
}

export default ProductForm