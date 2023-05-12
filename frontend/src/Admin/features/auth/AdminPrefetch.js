import { store } from '../../../app/store';
import { adminUsersApiSlice } from '../user/adminUsersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { adminOrdersApiSlice } from '../orders/adminOrdersApiSlice';

const AdminPrefetch = () => {

    useEffect(() => {
        // store.dispatch(adminUsersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        console.log('subscribing')
        const users = store.dispatch(adminUsersApiSlice.endpoints.getUsers.initiate())
        const orders = store.dispatch(adminOrdersApiSlice.endpoints.getOrders.initiate())
        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            orders.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default AdminPrefetch