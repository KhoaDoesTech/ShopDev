import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function AdminLayout({ children }) {
    return (
        <div className="w-screen h-screen box-border">
            <Header />
            <div className="flex items-center h-full">
                <Sidebar />
                <main className="w-full min-h-screen">{children}</main>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout