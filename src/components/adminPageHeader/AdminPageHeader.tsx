import React, { ReactNode } from 'react'

//                         get children     children's type
const AdminPageHeader = ({ children }: { children: ReactNode }) => {
    return (
        <h1 className='text-4xl mb-4'>{children}</h1>
    )
}

export default AdminPageHeader