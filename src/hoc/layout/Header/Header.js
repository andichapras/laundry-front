import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter,
    CLink
  } from '@coreui/react'

const Header = () => {
    const dispatch = useDispatch()
        const sidebarShow = useSelector(state => state.sidebarShow)

        const toggleSidebar = () => {
            const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
            dispatch({type: 'set', sidebarShow: val})
        }

        const toggleSidebarMobile = () => {
            const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
            dispatch({type: 'set', sidebarShow: val})
        }

    return (
        <CHeader>
            <CToggler
            inHeader
            className="ml-md-3 d-lg-none"
            onClick={toggleSidebarMobile}
        />
        <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={toggleSidebar}
        />
        </CHeader>
    )
}

export default Header