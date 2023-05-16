import { Outlet } from 'react-router-dom'
import AdminDashHeader from './AdminDashHeader'
import AdminDashFooter from './AdminDashFooter'

const AdminDashLayout = () => {
    return (
        <>
            <AdminDashHeader />
            <div className="mx-auto w-3/4  ">
                <Outlet />
            </div>
            <AdminDashFooter />
        </>
    )
}
export default AdminDashLayout