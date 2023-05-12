import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById } from './adminOrdersApiSlice'
import { selectAllUsers } from '../user/adminUsersApiSlice'
import EditOrderForm from './AdminEditOrderForm'

const AdminEditOrder = () => {

    const { id } = useParams()

    const order = useSelector(state => selectOrderById(state, id))
    const users = useSelector(selectAllUsers)

    const content = order ? <EditOrderForm order={order} users={users} /> : <p>Loading...</p>

    return content
}

export default AdminEditOrder