import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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

const Pelanggan = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedPelanggan, setLoadedPelanggan] = useState()

    const [loadedPelangganByNama, setLoadedPelangganByNama] = useState()
    const [loadedPelangganByEmail, setLoadedPelangganByEmail] = useState()
    const [loadedPelangganByTelepon, setLoadedPelangganByTelepon] = useState()

    const [showCariNama, setShowCariNama] = useState(false)
    const [showCariEmail, setShowCariEmail] = useState(false)
    const [showCariTelepon, setShowCariTelepon] = useState(false)

    const [formNama, setFormNama] = useState('')
    const [formEmail, setFormEmail] = useState('')
    const [formTelepon, setFormTelepon] = useState('')

    const kolomPelanggan = ['no', 'nama', 'email', 'telepon', 'jumlah transaksi']
    
    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/customer')
                setLoadedPelanggan(responseData.pelanggan)
            } catch (err) {}
        }
        fetchTransaksi()
    }, [sendRequest])

    const changeFormNamaHandler = e => {
        let input = formNama
        input = e.target.value
        setFormNama(input)
    }
    const changeFormEmailHandler = e => {
        let input = formEmail
        input = e.target.value
        setFormEmail(input)
    }
    const changeFormTeleponHandler = e => {
        let input = formTelepon
        input = e.target.value
        setFormTelepon(input)
    }

    const namaShowHandler = () => {
        const oldState = showCariNama
        setShowCariNama(!oldState)
    }
    const emailShowHandler = () => {
        const oldState = showCariEmail
        setShowCariEmail(!oldState)
    }
    const teleponShowHandler = () => {
        const oldState = showCariTelepon
        setShowCariTelepon(!oldState)
    }

    const tutupHandler = () => {
        setShowCariEmail(false)
        setShowCariNama(false)
        setShowCariTelepon(false)
    }

    const getPelangganByNama = async (event) => {
        event.preventDefault()
        try {
            const responseData = await sendRequest(`http://localhost:5000/customer/nama/${formNama}`)
            setLoadedPelangganByNama(responseData.pelangganByNama)
        } catch (err) {}
        namaShowHandler()
    }
    
    const getPelangganByTelepon = async (event) => {
        event.preventDefault()
        try {
            const responseData = await sendRequest(`http://localhost:5000/customer/telepon/${formTelepon}`)
            setLoadedPelangganByTelepon(responseData.pelangganByTelepon)
        } catch (err) {}
        teleponShowHandler()
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
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <h3>Nama</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getPelangganByNama}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan Nama</CLabel>
                                        <CInput type="text" id="textNama" name="textNama" onChange={changeFormNamaHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    {/* <CCol>
                        <CCard>
                            <CCardHeader>
                                <h3>Email</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getPelangganByEmail}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan Email</CLabel>
                                        <CInput type="email" id="email" name="email" onChange={changeFormEmailHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="info">Cari</CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol> */}
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <h3>No Telepon</h3>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={getPelangganByTelepon}>
                                    <CFormGroup>
                                        <CLabel htmlFor="nama">Masukkan No Telepon</CLabel>
                                        <CInput type="text" id="textNama" name="textNama" onChange={changeFormTeleponHandler} />
                                    </CFormGroup>
                                    <CButton type="submit" block color="primary">Cari</CButton>
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

            {!isLoading && loadedPelanggan && (
                <React.Fragment>
                    <CRow>
                        <CCol>
                            <h2>Data Pelanggan</h2>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CForm>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable 
                                            items={loadedPelanggan}
                                            fields={kolomPelanggan}
                                            itemsPerPage={10}
                                            pagination
                                            hover
                                            scopedSlots = {{
                                                'no':
                                                (item, idx) => (
                                                    <td>
                                                        { idx + 1 }
                                                    </td>
                                                ),
                                                'jumlah transaksi':
                                                (item, idx) => (
                                                    <td className="text-center">{item.jumlahTransaksi}</td>
                                                )
                                            }}
                                            />
                                    </CCardBody>
                                </CCard>
                            </CForm>
                        </CCol>
                    </CRow>
                </React.Fragment>
            )}

            {!isLoading && showCariNama && (
                <CModal
                    color="info"
                    onClose={namaShowHandler}
                    show={showCariNama}
                >
                    <CModalHeader>
                        <CModalTitle>Data Pelanggan</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <Table responsive hover striped>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>No Telepon</th>
                                    <th>Jumlah Transaksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadedPelangganByNama.map((pelanggan, idx) => (
                                    <tr key={idx}>
                                        <td>{pelanggan.nama}</td>
                                        <td>{pelanggan.email}</td>
                                        <td>{pelanggan.telepon}</td>
                                        <td>{pelanggan.jumlahTransaksi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CModalBody>
                </CModal>
            )}
            
            {!isLoading && showCariTelepon && (
                <CModal
                    color="primary"
                    onClose={teleponShowHandler}
                    show={showCariTelepon}
                >
                    <CModalHeader>
                        <CModalTitle>Data Pelanggan</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <Table responsive hover striped>
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>No Telepon</th>
                                    <th>Jumlah Transaksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadedPelangganByTelepon.map((pelanggan, idx) => (
                                    <tr key={idx}>
                                        <td>{pelanggan.nama}</td>
                                        <td>{pelanggan.email}</td>
                                        <td>{pelanggan.telepon}</td>
                                        <td>{pelanggan.jumlahTransaksi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CModalBody>
                </CModal>
            )}

            </CContainer>
        </React.Fragment>
    )
}

export default Pelanggan