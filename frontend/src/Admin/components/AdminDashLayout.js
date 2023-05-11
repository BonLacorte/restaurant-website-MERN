import { Outlet } from 'react-router-dom'
import AdminDashHeader from './AdminDashHeader'
import AdminDashFooter from './AdminDashFooter'

const AdminDashLayout = () => {
    return (
        <>
            <AdminDashHeader />
            <div className="dash-container">
                <Outlet />
            </div>
            <AdminDashFooter />
        </>
    )
}
export default AdminDashLayout