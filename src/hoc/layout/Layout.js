import React, { Component } from 'react'

import Content from './Content/Content'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/Footer'

class Layout extends Component {
    render() {
        return (
            <div className="c-app c-default-layout">
                <Sidebar />
                <div className="c-wrapper">
                    <Header />
                    <div className="c-body">
                        <Content />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Layout