import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import { AuthContext } from '../../../components/context/auth-context'

import CIcon from '@coreui/icons-react'

// Sidebar Nav Config
import nav from './nav'
import navSpv from './navSpv'

const Sidebar = () => {
    const auth = useContext(AuthContext)

    const dispatch = useDispatch()
    const show = useSelector(state => state.sidebarShow)

    // const auth = useContext(authContext)
    
    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >

            {auth.isLoggedIn && (
            <CSidebarNav>
                <CCreateElement
                    items={navSpv}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            )}

            {!auth.isLoggedIn && (
            <CSidebarNav>
                <CCreateElement
                    items={nav}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            )}

            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(Sidebar)