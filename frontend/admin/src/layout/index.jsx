import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function AdminLayout({ children }) {
    return (
        <div className="flex items-start">
            <Sidebar />
            <div className="w-full">
                <Header />
                <main className="w-full h-full min-h-screen">{children}</main>
                <Footer />
            </div>
        </div>
    )
}

export default AdminLayout