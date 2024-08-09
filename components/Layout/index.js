import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import PageTitle from '../PageTitle'


const Layout = ({ children }) => {
    return (
        
        <div>
            <PageTitle/>
            <Header/>
            <div className='container mx-auto my-12'>
                { children }
            </div>
            <Footer/>
        </div>
    )
}

export default Layout