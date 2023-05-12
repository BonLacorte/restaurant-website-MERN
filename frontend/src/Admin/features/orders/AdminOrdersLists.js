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
if (isLoading) content = <p>Loading123...</p>
if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
}
if (isSuccess) {

    const tableContent = orders?.map((order) => (
        <AdminOrders key={order._id} order={order} />
      ));

    content = (
        <>
            <table className>
            <thead className>
                <tr>
                    <th scope="col" className>Order Id</th>
                    <th scope="col" className>User</th>
                    <th scope="col" className>Created</th>
                    <th scope="col">Delivered</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
        <div className="my-10">
            <p><Link to="/admin/dash/orders/new">Add a new Order</Link></p>
        </div>
        </>
    )
}
return content
}
export default AdminOrdersLists