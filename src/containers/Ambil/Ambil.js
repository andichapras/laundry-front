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

const Ambil = () => {
    const history = useHistory()

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedTransaksiByEmail, setLoadedTransaksiByEmail] = useState()
    const [loadedTransaksiByNota, setLoadedTransaksiByNota] = useState()
    const [loadedTransaksiByNama, setLoadedTransaksiByNama] = useState()
    const [loadedTransaksiByTelepon, setLoadedTransaksiByTelepon] = useState()

    const [showModalAmbil, setShowModalAmbil] = useState(false)
    const [showCariEmail, setShowCariEmail] = useState(false)
    const [showCariNota, setShowCariNota] = useState(false)
    const [showCariNama, setShowCariNama] = useState(false)
    const [showCariTelepon, setShowCariTelepon] = useState(false)

    const [formEmail, setFormEmail] = useState('')
    const [formNota, setFormNota] = useState('')
    const [formNama, setFormNama] = useState('')
    const [formTelepon, setFormTelepon] = useState('')

    const kolomAmbil = ['tanggal', 'nama', 'email', 'kurangBayar', 'status', 'ambil']

    // useEffect(() => {
    //     const fetchTransaksi = async () => {
    //         try {
    //             const responseData = await sendRequest('http://localhost:5000/transaksi')
    //             console.log(responseData)
    //             setLoadedTransaksi(responseData.transaksi)
    //         } catch (err) {}
    //     }
    //     fetchTransaksi()
    // }, [sendRequest])

    const changeFormEmailHandler = e => {
        let input = formEmail
        input = e.target.value
        setFormEmail(input)
    }
    
    const changeFormNotaHandler = e => {
        let input = formNota
        input = e.target.value
        setFormNota(input)
    }
    
    const changeFormNamaHandler = e => {
        let input = formNama
        input = e.target.value
        setFormNama(input)
    }
    const changeFormTeleponHandler = e => {
        let input = formTelepon
        input = e.target.value
        setFormTelepon(input)
    }
    
    const emailShowHandler = () => {
        const oldState = showCariEmail
        setShowCariEmail(!oldState)
    }
    
    const notaShowHandler = () => {
        const oldState = showCariNota
        setShowCariNota(!oldState)
    }
    
    const namaShowHandler = () => {
        const oldState = showCariNama
        setShowCariNama(!oldState)
    }
    
    const teleponShowHandler = () => {
        const oldState = showCariTelepon
        setShowCariTelepon(!oldState)
    }

    const clearData = () => {

    }

    const getTransaksiByEmail = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`http://ameera-laundry.herokuapp.com/transaksi/customer/email/${formEmail}`)
            setLoadedTransaksiByEmail(responseData.transaksiByEmail)
        } catch (err) {}
        emailShowHandler()
    }
    
    const getTransaksiByNota = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`http://ameera-laundry.herokuapp.com/transaksi/${formNota}`)
            console.log(responseData)
            setLoadedTransaksiByNota(responseData.transaksi)
        } catch (err) {}
        notaShowHandler()
    }
    
    const getTransaksiByNama = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`http://ameera-laundry.herokuapp.com/transaksi/customer/nama/${formNama}`)
            console.log(responseData)
            setLoadedTransaksiByNama(responseData.transaksiByCustomer)
        } catch (err) {}
        namaShowHandler()
    }
    
    const getTransaksiByTelepon = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`http://ameera-laundry.herokuapp.com/transaksi/customer/telepon/${formTelepon}`)
            console.log(responseData)
            setLoadedTransaksiByTelepon(responseData.transaksiByTelepon)
        } catch (err) {}
        teleponShowHandler()
    }

    const pilihHeader = () => {
        if (showCariEmail === true) {
            return formEmail
        } else if (showCariNota === true) {
            return formNota
        } else if (showCariNama === true) {
            return formNama
        } else if (showCariTelepon === true) {
            return formTelepon
        }
    }
    
    const pilihData = () => {
        if (showCariEmail === true) {
            return loadedTransaksiByEmail
        } else if (showCariNota === true) {
            return loadedTransaksiByNota
        } else if (showCariNama === true) {
            return loadedTransaksiByNama
        } else if (showCariTelepon === true) {
            return loadedTransaksiByTelepon
        }
    }
    
    const modalAmbilHandler = () => {
        const oldState = showModalAmbil
        setShowModalAmbil(!oldState)
    }

    const pengambilanHandler = async (event, idx) => {
        event.preventDefault()
        let transaksi
        if (showCariEmail === true) {
            transaksi = loadedTransaksiByEmail
        } else if (showCariNota === true) {
            transaksi = loadedTransaksiByNota
        } else if (showCariNama === true) {
            transaksi = loadedTransaksiByNama
        } else if (showCariTelepon === true) {
            transaksi = loadedTransaksiByTelepon
        }
        const transaksiId = transaksi[idx].id
        try {
            await sendRequest(
                `http://localhost:5000/transaksi/customer/nota/${transaksiId}`, 
                'PATCH', 
                JSON.stringify({
                    
                }), 
                {
                    'Content-Type': 'application/json'
                }
            )
            history.push('/laundry/order')
        } catch (err) { }
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

            <CContainer fluid>
                <h2>Ambil Barang</h2>
                <CRow>
                    <CCol md>
                        <CCard>
                            <CCardHeader>
                                <h3>Email</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getTransaksiByEmail}>
                                    <CFormGroup>
                                        <CLabel htmlFor="email">Masukkan Email</CLabel>
                                        <CInput type="email" id="email" onChange={changeFormEmailHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md>
                        <CCard>
                            <CCardHeader>
                                <h3>ID Nota</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getTransaksiByNota}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan Id Nota</CLabel>
                                        <CInput type="text" id="textIdNota" name="textIdNota" onChange={changeFormNotaHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md>
                        <CCard>
                            <CCardHeader>
                                <h3>Nama</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getTransaksiByNama}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan Nama</CLabel>
                                        <CInput type="text" id="textNama" name="textNama" onChange={changeFormNamaHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md>
                        <CCard>
                            <CCardHeader>
                                <h3>No Telepon</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getTransaksiByTelepon}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan No Telepon</CLabel>
                                        <CInput type="text" id="textNama" name="textNama" onChange={changeFormTeleponHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                
                {isLoading && (
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardBody>
                                    <LoadingSpinner />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                )}

                {!isLoading && (showCariEmail || showCariNota || showCariNama || showCariTelepon) && 
                    (
                        <CRow>
                            <CCol>
                                <CCard>
                                    {/* <CForm onSubmit={(e) => pengambilanHandler(e, idx)}> */}
                                        <CCardHeader>
                                            <h3>{pilihHeader()}</h3>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CDataTable 
                                                items={pilihData()}
                                                fields={kolomAmbil}
                                                itemsPerPage={6}
                                                pagination
                                                hover
                                                scopedSlots = {{
                                                    'tanggal':
                                                    (item, idx) => (
                                                        <td>
                                                            <Moment format="DD/MM/YYYY">
                                                                {item.tanggal}
                                                            </Moment>
                                                        </td>
                                                    ),
                                                    'kurangBayar':
                                                    (item, idx) => (
                                                        <td>{item.totalBayar - item.uangMuka}</td>
                                                    ),
                                                    'status':
                                                    (item, idx) => (
                                                        <td>{item.status ? 'Selesai' : 'Belum'}</td>
                                                    ),
                                                    'ambil':
                                                    (item, idx) => (
                                                        <td>
                                                            <CForm onSubmit={(e) => pengambilanHandler(e, idx)}>
                                                                <CButton type="submit" block variant="outline" color="primary">Proses</CButton>
                                                            </CForm>
                                                        </td>
                                                    )
                                                }}
                                            />
                                        </CCardBody>
                                    {/* </CForm> */}
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                
                }
            </CContainer>

            {/* <CModal
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
            </CModal> */}
        </React.Fragment>

        
    )
}

export default Ambil