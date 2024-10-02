import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const AdminDashboard = () => {
    //  grid: Enable CSS Grid Layout. Using the grid class turns an element into a grid container.
    // grid-cols-1: On small screens, the grid container will have 1 column. This is the default behavior and is suitable for mobile phones or small screen devices.

    // md:grid-cols-2: On medium screens (md means screen width ≥ 768px), the grid container will have 2 columns. When the screen width reaches the medium breakpoint, the layout automatically switches to 2 columns.
    // lg:grid-cols-3: On large screens (lg means screen width ≥ 1024px), the grid container will have 3 columns. When the screen reaches the larger breakpoint, the layout adjusts to 3 columns.
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Sales</CardTitle>
                    <CardDescription>desc</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>text</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboard