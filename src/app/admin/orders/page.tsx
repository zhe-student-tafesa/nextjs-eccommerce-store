import AdminPageHeader from '@/components/adminPageHeader/AdminPageHeader';
import DeleteDropdownOrderItem from '@/components/deleteDropdownOrderItem/DeleteDropdownOrderItem';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { MoreVertical } from 'lucide-react';
import React from 'react'

const OrdersPage = () => {
  return (<>
    <div className="flex justify-between items-center gap-4">
      <AdminPageHeader>
        Sales
      </AdminPageHeader>
    </div>
    <OrdersTable />
  </>);
}

export default OrdersPage

async function OrdersTable() {
  const orders = await db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  if (orders.length === 0) {
    return <p>No rrders found</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              {order.product.name}
            </TableCell>

            <TableCell>{order.user.email}</TableCell>

            <TableCell>{formatCurrency(order.pricePaidInCents / 100)}</TableCell>

            <TableCell className='text-center'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DeleteDropdownOrderItem orderId={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}