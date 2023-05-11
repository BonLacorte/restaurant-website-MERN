import { store } from '../../../app/store';
import { adminUsersApiSlice } from '../user/adminUsersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import React from 'react'

const AdminPrefetch = () => {

    useEffect(() => {
        // store.dispatch(adminUsersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        console.log('subscribing')
        const users = store.dispatch(adminUsersApiSlice.endpoints.getUsers.initiate())
        
        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default AdminPrefetch