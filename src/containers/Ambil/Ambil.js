import React, { Component } from 'react'

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
} from '@coreui/react'

const Ambil = () => {
    return (
        <React.Fragment>
            <h2>Ambil Barang</h2>
            <CRow>
                {/* <CCol md>
                    <CCard>
                        <CCardHeader>
                            Nota
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CFormGroup>
                                    <CLabel htmlFor="nota">Masukkan Nota</CLabel>
                                    <CInput id="nota" />
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol> */}
                <CCol md>
                    <CCard>
                        <CCardHeader>
                            Email
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CFormGroup>
                                    <CLabel htmlFor="email">Masukkan Email</CLabel>
                                    <CInput id="email" />
                                </CFormGroup>
                                <CButton block color="info">Cari</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md>
                    <CCard>
                        <CCardHeader>
                            Nama
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CFormGroup>
                                    <CLabel htmlFor="nama">Masukkan Nama</CLabel>
                                    <CInput id="nama" />
                                </CFormGroup>
                                <CButton block color="primary">Cari</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>

            </CRow>
        </React.Fragment>
    )
}

export default Ambil