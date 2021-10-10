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
    const [loadedUser, setLoadedUser] = useState()
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/user')
                setLoadedUser(responseData.user)
            } catch (err) {}
        }
        fetchUser()
        console.log(loadedUser)
    }, [sendRequest])

    const [dataKasir, setDataKasir] = useState({
        username: '',
        password: ''
    })

    const [dataSpv, setDataSpv] = useState({
        username: '',
        password: ''
    })

    const editKasirHandler = (event) => {
        let data = {...dataKasir}
        if(event.target.name === "username") {
            data.username = event.target.value
        } else if(event.target.name === "password") {
            data.password = event.target.value
        }
        setDataKasir(data)
    }
    
    const editSpvHandler = (event) => {
        let data = {...dataSpv}
        if(event.target.name === "username") {
            data.username = event.target.value
        } else if(event.target.name === "password") {
            data.password = event.target.value
        }
        setDataSpv(data)
    }

    const editDataKasir = async (event) => {
        event.preventDefault()
        try {
            await sendRequest(
                `http://localhost:5000/user/kasir`,
                'PATCH',
                JSON.stringify({
                    username: dataKasir.username,
                    password: dataKasir.password
                }), 
                {
                    'Content-Type': 'application/json'
                }
            )
        } catch (err) {

        }
    }
    
    const editDataSpv = async (event) => {
        event.preventDefault()
        try {
            await sendRequest(
                `http://localhost:5000/user/spv`,
                'PATCH',
                JSON.stringify({
                    username: dataSpv.username,
                    password: dataSpv.password
                }), 
                {
                    'Content-Type': 'application/json'
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

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

            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}

            {!isLoading && loadedUser && 
                <CContainer fluid>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CForm onSubmit={editDataKasir}>
                                    <CCardHeader>
                                        <h3>Kasir</h3>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CFormGroup>
                                            <CLabel>Username</CLabel>
                                            <CInput type="text" id="username" name="username" placeholder={loadedUser[0].username} onChange={editKasirHandler} required />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel>Password</CLabel>
                                            <CInput type="text" id="password" name="password" placeholder={loadedUser[0].password} onChange={editKasirHandler} required />
                                        </CFormGroup>
                                        <CButton type="submit" block color="info">Ubah</CButton>
                                    </CCardBody>
                                </CForm>
                            </CCard>
                            </CCol>
                            <CCol>
                            <CCard>
                                <CForm onSubmit={editDataSpv}>
                                    <CCardHeader>
                                        <h3>Supervisor</h3>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CFormGroup>
                                            <CLabel>Username</CLabel>
                                            <CInput type="text" id="username" name="username" placeholder={loadedUser[1].username} onChange={editSpvHandler} required />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel>Password</CLabel>
                                            <CInput type="text" id="password" name="password" placeholder={loadedUser[1].password} onChange={editSpvHandler} required />
                                        </CFormGroup>
                                        <CButton type="submit" block color="info">Ubah</CButton>
                                    </CCardBody>
                                </CForm>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            }
        </React.Fragment>
    )
}

export default User