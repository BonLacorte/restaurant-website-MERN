import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './adminUsersApiSlice'
import AdminEditUserForm from './AdminEditUserForm'

const AdminEditUser = () => {

    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const content = user ? <AdminEditUserForm user={user} /> : <p>Loading...</p>

    return content
}

export default AdminEditUser