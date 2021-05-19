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

const Cari = () => {
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

    const kolomCari = ['tgl transaksi', 'nama', 'email', 'notelp', 'ambil', 'tgl ambil']

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

    const tutupHandler = () => {
        setShowCariEmail(false)
        setShowCariNama(false)
        setShowCariNota(false)
        setShowCariTelepon(false)
    }

    const getTransaksiByEmail = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`https://ameera-laundry.herokuapp.com/transaksi/cari/email/${formEmail}`)
            setLoadedTransaksiByEmail(responseData.transaksiByEmail)
        } catch (err) {}
        emailShowHandler()
    }
    
    const getTransaksiByNota = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`https://ameera-laundry.herokuapp.com/transaksi/${formNota}`)
            console.log(responseData)
            setLoadedTransaksiByNota(responseData.transaksi)
        } catch (err) {}
        notaShowHandler()
    }
    
    const getTransaksiByNama = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`https://ameera-laundry.herokuapp.com/transaksi/cari/nama/${formNama}`)
            console.log(responseData)
            setLoadedTransaksiByNama(responseData.transaksiByCustomer)
        } catch (err) {}
        namaShowHandler()
    }
    
    const getTransaksiByTelepon = async (event, idx) => {
        event.preventDefault()
        try{
            const responseData = await sendRequest(`https://ameera-laundry.herokuapp.com/transaksi/cari/telepon/${formTelepon}`)
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
                <h2>Cari Transaksi</h2>
                <CRow>
                    <CCol>
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
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <h3>Email</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getTransaksiByEmail}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan Email</CLabel>
                                        <CInput type="email" id="email" name="email" onChange={changeFormEmailHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol>
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
                    <CCol>
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
                                    <CCardHeader>
                                        <CRow>
                                            <CCol md={4}>
                                                <h3>{pilihHeader()}</h3>
                                            </CCol>
                                            <CCol md={{ span: 2, offset: 6 }}>
                                                <CButton color="danger" onClick={tutupHandler}>tutup</CButton>
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CDataTable 
                                            items={pilihData()}
                                            fields={kolomCari}
                                            itemsPerPage={6}
                                            pagination
                                            hover
                                            scopedSlots = {{
                                                'tgl transaksi':
                                                (item, idx) => (
                                                    <td>
                                                        <Moment format="DD/MM/YYYY">
                                                            {item.tanggal}
                                                        </Moment>
                                                    </td>
                                                ),
                                                'notelp':
                                                (item, idx) => (
                                                    <td>{item.telepon}</td>
                                                ),
                                                'ambil':
                                                (item, idx) => (
                                                    <td>{item.ambil ? 'Selesai' : 'Belum'}</td>
                                                ),
                                                'tgl ambil':
                                                (item, idx) => (
                                                    <td>
                                                        <Moment format="DD/MM/YYYY">
                                                            {item.tglAmbil}
                                                        </Moment>
                                                    </td>
                                                )
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                }

            </CContainer>
        </React.Fragment>
    )
}

export default Cari