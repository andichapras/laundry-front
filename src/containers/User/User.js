import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../components/hooks/http-hooks'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CButton,
    CDataTable,
    CBadge,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CContainer,
    CCardFooter
} from '@coreui/react'

const User = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    return (
        <React.Fragment>
            <CModal
                show={error}
                onClose={clearError}
                color="danger"
            >
                <CModalHeader>
                    <CModalTitle>Error</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>{error}</p>
                </CModalBody>
            </CModal>
        </React.Fragment>
    )
}

export default User