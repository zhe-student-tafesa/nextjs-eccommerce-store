import AdminPageHeader from "@/components/adminPageHeader/AdminPageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from 'react'

const AdminProductsPage = () => {
    // return and JSX are on the same line
    return (<>
        <div className="flex justify-between items-center gap-4">
            <AdminPageHeader>
                AdminPageHeader
            </AdminPageHeader>
            <Button asChild>
                <Link href="/admin/products/new"  >
                    Add Product
                </Link>
            </Button>
        </div>
    </>);
}

export default AdminProductsPage