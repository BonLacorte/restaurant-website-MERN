import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './adminUsersApiSlice'

const AdminUsers = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/admin/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{user.firstname}</td>
                <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{userRolesString}</td>
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
export default AdminUsers