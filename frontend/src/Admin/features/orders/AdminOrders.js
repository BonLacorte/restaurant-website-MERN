import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const AdminOrders = ({ order }) => {
  
  const navigate = useNavigate()
  if (order) {
    const created = new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const delivered = new Date(order.deliveredAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const handleEdit = () => navigate(`/admin/dash/orders/${order._id}`)
    const { user, totalPrice, orderStatus } = order;
    return (
        <tr >
            <td>{order._id}</td>
            <td>{user?.email}</td>
            <td>{created}</td>
            <td>{delivered}</td>
            <td>{totalPrice}</td>
            <td>{orderStatus}</td>

            <td >
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