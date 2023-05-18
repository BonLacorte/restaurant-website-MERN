import { useGetProductsQuery } from "./adminProductsApiSlice"
import AdminProducts from './AdminProducts'
import { Link } from "react-router-dom"
import PulseLoader from 'react-spinners/PulseLoader'

const AdminProductsLists = () => {

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetProductsQuery(undefined, { 
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true 
})

let content
if (isLoading) content = (
    <div className="flex justify-center">
        <PulseLoader  color={"#FFF"} />
    </div>
)
if (isError) {
    content = (
        <>
            <p className="flex justify-center">{error?.data?.message}</p>
            <div className="my-10">
                <p><Link to="/admin/dash/products/new">Add a new Product</Link></p>
            </div>
        </>
        
    )
}

if (isSuccess) {
    const { ids } = products

    const tableContent = ids?.length
            ? ids.map(productId => <AdminProducts key={productId} productId={productId} />)
            : null

    content = (
        <>
            <div className="flex justify-center">
                <table className="w-3/4 bg-black text-white">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Product Id</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Name</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Category</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Price</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Created At</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Available</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
            
        <div className="my-10">
            <p><Link to="/admin/dash/products/new">Add a new Product</Link></p>
        </div>
        </>
    )
}
return content
}
export default AdminProductsLists