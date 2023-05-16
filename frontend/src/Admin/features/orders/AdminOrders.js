import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrderById } from './adminOrdersApiSlice'
import { selectAllUsers } from '../user/adminUsersApiSlice'

const AdminOrders = ({ orderId }) => {
    const order = useSelector(state => selectOrderById(state, orderId))
    const users = useSelector(selectAllUsers);

  const navigate = useNavigate()
  if (order) {

    const handleEdit = () => navigate(`/admin/dash/orders/${orderId}`)

    const user = users.find((user) => user._id === order.user);
    const userName = user ? `${user.firstname} ${user.lastname}` : "Unknown";

    const created = new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const delivered = new Date(order.deliveredAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const { totalPrice, orderStatus } = order;
    
    return (
        <tr >
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{order._id}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{userName}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{created}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{delivered}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{order.totalPrice}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{order.orderStatus}</td>

            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">
                <button
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )
  } else return null
}
export default AdminOrders