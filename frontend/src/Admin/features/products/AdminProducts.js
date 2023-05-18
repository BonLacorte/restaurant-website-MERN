import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectProductById } from './adminProductsApiSlice'

const AdminProducts = ({ productId }) => {
    const product = useSelector(state => selectProductById(state, productId))


  const navigate = useNavigate()

  if (product) {
    const handleEdit = () => navigate(`/admin/dash/products/${productId}`)

    const created = new Date(product.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const available = product.available ? 'Yes' : 'No'

    return (
        <tr >
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product._id}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product.name}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product.category}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product.price}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{created}</td>
            <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{available}</td>

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
export default AdminProducts