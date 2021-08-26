import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
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
    CLink,
    CButton
  } from '@coreui/react'

  import { AuthContext } from '../../../components/context/auth-context'

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

    const auth = useContext(AuthContext)

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

            {auth.isLoggedIn && (
            <CHeaderNav className="col-sm-3">
                <Link to="/laundry/order">
                    <CButton color="primary" className="px-0" active tabIndex={-1} onClick={auth.logout}>Normal</CButton>
                </Link>
            </CHeaderNav>
            )}

            {!auth.isLoggedIn && (
            <CHeaderNav className="col-sm-3">
                <Link to="/loginSpv">
                    <CButton color="primary" className="px-0" active tabIndex={-1}>SPV</CButton>
                </Link>
            </CHeaderNav>
            )}

            <CHeaderNav className="col-sm-5">
                <h1>Ameera Laundry</h1>
            </CHeaderNav>

            {!auth.isLoggedIn && (
                <CHeaderNav className="col-sm-3">
                    <Link to="/">
                        <CButton color="danger" className="px-0" active tabIndex={-1}>Keluar</CButton>
                    </Link>
                </CHeaderNav>
            )}

        </CHeader>
    )
}

export default Header