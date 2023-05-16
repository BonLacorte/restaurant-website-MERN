// import { store } from '../../app/store'
// import { usersApiSlice } from '../user/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import React from 'react'

const Prefetch = () => {

    useEffect(() => {
        // store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        console.log('subscribing')
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        
        return () => {
            console.log('unsubscribing')
            // users.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default Prefetch