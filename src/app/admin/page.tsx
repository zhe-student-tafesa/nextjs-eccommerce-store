import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// make sure: prisma version equal to prisma client version
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters';
import React from 'react'

// get data from DB
async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true,
    });

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

async function getUsersData() {
    const userCount = await db.user.count();
    const orderData = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
    });
    return {
        amountPerUser: userCount === 0 ? 0 : (orderData as unknown as number) / userCount,
    }
}
const AdminDashboard = async () => {
    // const datatest =  process.env.HOST_URL;
    // console.log(datatest)
    const data = await getSalesData();
    //  grid: Enable CSS Grid Layout. Using the grid class turns an element into a grid container.
    // grid-cols-1: On small screens, the grid container will have 1 column. This is the default behavior and is suitable for mobile phones or small screen devices.

    // md:grid-cols-2: On medium screens (md means screen width ≥ 768px), the grid container will have 2 columns. When the screen width reaches the medium breakpoint, the layout automatically switches to 2 columns.
    // lg:grid-cols-3: On large screens (lg means screen width ≥ 1024px), the grid container will have 3 columns. When the screen reaches the larger breakpoint, the layout adjusts to 3 columns.
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <DashboardCard
                title={'Sales'}
                subTitle={`${formatNumber(data.numberOfSales)} Orders`}
                body={formatCurrency(data.amount)}
            />
        </div>
    )
}

export default AdminDashboard

interface DashboardCardProps {
    title: string
    subTitle: string
    body: string
}
export function DashboardCard({ title, subTitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    );
}


