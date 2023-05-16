import { useGetOrdersQuery } from "./adminOrdersApiSlice"
import AdminOrders from './AdminOrders'
import { Link } from "react-router-dom"

const AdminOrdersLists = () => {

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetOrdersQuery(undefined, { 
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true 
})

let content
if (isLoading) content = <p>Loading...</p>
if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
}
// console.log(`orders ${typeof(orders)}`)
if (isSuccess) {
    const { ids } = orders

    // console.log(`orderArray ${typeof(orderArray)}`)
    const tableContent = ids?.length
            ? ids.map(orderId => <AdminOrders key={orderId} orderId={orderId} />)
            : null
    

    content = (
        <>
            <div className="flex justify-center">
                <table className="w-3/4 bg-black text-white">
                    <thead className>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Order Id</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">User</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Created</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Delivered</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Total Price</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Order Status</th>
                            <th scope="col" className="px-6 py-3 bg-gray-800 text-left text-sm font-medium">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
            
        <div className="my-10">
            <p><Link to="/admin/dash/orders/new">Add a new Order</Link></p>
        </div>
        </>
    )
}
return content
}
export default AdminOrdersLists