import { useGetUsersQuery } from "./adminUsersApiSlice"
import AdminUsers from './AdminUsers'
import { Link } from "react-router-dom"

const AdminUsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, { 
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true 
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <AdminUsers key={userId} userId={userId} />)
            : null

        content = (
            <>
                <div className="flex justify-center">
                    <table className="w-3/4 bg-black text-white">
                        <thead className>
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Username</th>
                                <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Roles</th>
                                <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
                
            <div className="my-10">
                <p><Link to="/admin/dash/users/new">Add a new User</Link></p>
            </div>
            </>
            
  
        )
    }

    return content
}
export default AdminUsersList