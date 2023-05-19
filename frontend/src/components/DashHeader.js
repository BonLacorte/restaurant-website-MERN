import { Link } from 'react-router-dom'

const DashHeader = () => {

    const content = (
        <header className="mx-auto w-3/5  ">
            <div >
                {/* add nav buttons later */}
                <div className='w-full container mx-auto flex items-center justify-between mt-0 py-2 '>
                    <div className='pl-4 flex items-center '>
                        <Link to="/dash">
                            <h1 className="text-3xl font-serif text-red-700">Costa's</h1>
                        </Link>
                    </div>
                    <div className='nav-menu-wrapper flex flex-row space-x-20'>
                        <div className='nav-menu-wrapper  flex flex-row space-x-4'>
                            <p><Link to="/dash/menu">Menu</Link></p>
                            <p><Link to="/dash/about">About</Link></p>
                            <p><Link to="/dash/gallery">Gallery</Link></p>
                            <p><Link to="/dash/contact">Contact</Link></p>
                        </div>
                        <div className='nav-menu-wrapper  flex flex-row space-x-4'>
                            <p><Link to="/dash/cart">Cart</Link></p>
                            <p><Link to="/register">Register</Link></p>
                            <p><Link to="/login">Login</Link></p>
                            <p><Link to="/dash/users">User</Link></p>
                            <p><Link to="/admin/dash">Admin</Link></p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </header>
    )

    return content
}
export default DashHeader