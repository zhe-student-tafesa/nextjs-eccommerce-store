import AdminPageHeader from "@/components/adminPageHeader/AdminPageHeader"
import { Button } from "@/components/ui/button"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

function ProductsTable() {
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
        </Table>
    )
}