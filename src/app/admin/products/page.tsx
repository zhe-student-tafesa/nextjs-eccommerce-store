import ActiveToggleDropdownItem from "@/components/activeToggleDropdownItem/ActiveToggleDropdownItem"
import AdminPageHeader from "@/components/adminPageHeader/AdminPageHeader"
import DeleteDropdownItem from "@/components/deleteDropdownItem/deleteDropdownItem"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"

import Link from "next/link"
import React from 'react'

const AdminProductsPage = () => {
    // return and JSX are on the same line
    return (<>
        <div className="flex justify-between items-center gap-4">
            <AdminPageHeader>
                Products
            </AdminPageHeader>
            <Button asChild>
                <Link href="/admin/products/new"  >
                    Add Product
                </Link>
            </Button>
        </div>
        <ProductsTable />
    </>);
}

export default AdminProductsPage

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            // orders munber
            _count: { select: { orders: true } }
        },
        orderBy: { name: "asc" }
    })

    if (products.length === 0) {
        return <p>No products found</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.isAvailableForPurchase ?
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2></CheckCircle2>
                                </>
                                : <>
                                    <span className="sr-only">Unavailable</span>
                                    {/* add red color when not Available */}
                                    <XCircle className="stroke-destructive"></XCircle>
                                </>
                            }
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                            Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`} >
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator />
                                    {/*  if we have order in this product, we should not delete this product */}
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}