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


export function ProductCardSkeleton() {
  return (
    <div>
      <Card className='flex overflow-hidden flex-col animate-pulse'>

        <div className=' w-full  aspect-video bg-gray-300'></div>
        <CardHeader>
          <CardTitle>
            <div className='w-3/4 h-6 rounded-full bg-gray-300'></div>
          </CardTitle>
          <CardDescription>
            <div className='w-1/2 h-4 rounded-full bg-gray-300'></div>
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-2'>
          <div className='w-full h-4 rounded-full bg-gray-300'></div>
          <div className='w-full h-4 rounded-full bg-gray-300'></div>
          <div className='w-3/4 h-4 rounded-full bg-gray-300'></div>
        </CardContent>

        <CardFooter>
          <Button className='w-full' disabled size={"lg"} > </Button>
        </CardFooter>
        
      </Card>
    </div>
  )
}