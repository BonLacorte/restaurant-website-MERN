import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductById } from './adminProductsApiSlice'
import AdminEditProductForm from './AdminEditProductForm'

const AdminEditProduct = () => {

    const { id } = useParams()

    const product = useSelector(state => selectProductById(state, id))

    const content = product ? <AdminEditProductForm product={product} /> : <p>Loading...</p>

    return content
}

export default AdminEditProduct