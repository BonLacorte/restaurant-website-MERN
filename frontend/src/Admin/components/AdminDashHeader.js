import { Link } from 'react-router-dom'

const AdminDashHeader = () => {

    const content = (
        <header className="mx-auto w-full  ">
            <div>
                {/* add nav buttons later */}
                <div className='w-full container mx-auto flex items-center justify-between mt-0 py-2 '>
                    <div className='pl-4 flex items-center '>
                        <Link to="/admin/dash">
                            <h1 className="lg">techNotes</h1>
                        </Link>
                    </div>
                    <div className='nav-menu-wrapper flex flex-row space-x-20'>
                        <div className='nav-menu-wrapper  flex flex-row space-x-4'>
                            <p><Link to="/admin/dash/products">Menu</Link></p>
                            <p><Link to="/admin/dash/orders">Orders</Link></p>
                            <p><Link to="/admin/dash/users">Users</Link></p>
                        </div>
                        <div className='nav-menu-wrapper  flex flex-row space-x-4'>
                            <p><Link to="/admin/register">Register</Link></p>
                            <p><Link to="/admin/login">Login</Link></p>
                            <p><Link to="/dash">Customer</Link></p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </header>
    )

    return content
}
export default AdminDashHeader