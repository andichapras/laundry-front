import React from 'react'
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

import CIcon from '@coreui/icons-react'

// Sidebar Nav Config
import nav from './nav'

const Sidebar = () => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.sidebarShow)
    
    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >

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
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(Sidebar)