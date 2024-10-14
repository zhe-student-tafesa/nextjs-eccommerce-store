import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { formatCurrency } from '@/lib/formatters'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCardProps } from '@/types'

const ProductCard = ({ name, priceInCents, description, id, imagePath }: ProductCardProps) => {
  return (
    <div>
      <Card className='flex overflow-hidden flex-col'>
        <div className='relative w-full h-auto aspect-video'>
          <Image src={imagePath} fill alt={name} />
        </div>
        <CardHeader>
          <CardTitle>  {name}</CardTitle>
          <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
        </CardHeader>
        <CardContent className='flex-grow'>
          <p className='line-clamp-4'>{description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild size={"lg"} className='w-full'>
            <Link href={`/products/${id}/purchase`} >  purchase</Link>
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default ProductCard