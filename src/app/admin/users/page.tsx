import AdminPageHeader from '@/components/adminPageHeader/AdminPageHeader';
import DeleteDropdownUserItem from '@/components/deleteDropdownUserItem/DeleteDropdownUserItem';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const UsersPage = () => {
  return (<>
    <div className="flex justify-between items-center gap-4">
      <AdminPageHeader>
        Customers
      </AdminPageHeader>
      {/* <Button asChild>
            <Link href="/admin/products/new"  >
                Add Product
            </Link>
        </Button> */}
    </div>
    <UsersTable />
  </>);
}

export default UsersPage

async function UsersTable() {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  if (users.length === 0) {
    return <p>No customers found</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.email}
            </TableCell>

            <TableCell>{formatNumber(user.orders.length)}</TableCell>

            <TableCell>{formatCurrency(
              user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100
            )}</TableCell>

            <TableCell className='text-center'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DeleteDropdownUserItem userId={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}