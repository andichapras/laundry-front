import React, { useState, useRef } from 'react'

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
} from '@coreui/react'

const Ambil = () => {
    const [showModalAmbil, setShowModalAmbil] = useState(false)
    const [idNota, setIdNota] = useState('')

    const modalAmbilHandler = () => {
        const oldState = showModalAmbil
        setShowModalAmbil(!oldState)
    }

    const inputIdNotaHandler = (e) => {
        let input = idNota
        input = e.target.value
        setIdNota(input)
    }

    const pengambilanHandler = () => {

    }

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
                                    <CInput type="email" id="email" />
                                </CFormGroup>
                                <CButton block color="info">Cari</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md>
                    <CCard>
                        <CCardHeader>
                            ID Nota
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CFormGroup>
                                    <CLabel htmlFor="nama">Masukkan Id Nota</CLabel>
                                    <CInput type="text" id="textIdNota" name="textIdNota" onInput={inputIdNotaHandler} />
                                </CFormGroup>
                                <CButton block color="primary" onClick={modalAmbilHandler}>Cari</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CModal
                color="success"
                onClose={modalAmbilHandler}
                show={showModalAmbil}
            >
                <CForm>
                    <CModalHeader>
                        <CModalTitle>Ambil Barang</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>ID Nota</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="idNota" name="idNota" placeholder={idNota} disabled />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Kekurangan Bayar</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="kurang-bayar" name="kurang-bayar" placeholder="50000" disabled />
                            </CCol>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="success" onClick={pengambilanHandler}>Selesaikan</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </React.Fragment>
    )
}

export default Ambil