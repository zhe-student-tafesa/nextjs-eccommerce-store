import db from '@/db/db'
import { notFound } from 'next/navigation'
import React from 'react'

const PurchasePage = async ({ params: { id } }: { params: { id: string } }) => {
    const product = await db.product.findUnique({
        where: { id: id }
    })
    console.log(product)
    if (product == null) {
        return notFound()
    }
    return (
        <div>PurchasePage</div>
    )
}

export default PurchasePage