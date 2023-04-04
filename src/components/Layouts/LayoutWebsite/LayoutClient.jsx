import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../LayoutComponents/Header'
import Footer from '../LayoutComponents/Footer'
const LayoutClient = () => {
    return (
        <div>
            <Header />
                <Outlet/>
            <Footer/>
        </div>
    )
}
export default LayoutClient