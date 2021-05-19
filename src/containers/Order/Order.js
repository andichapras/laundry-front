import React, { useState, useEffect } from 'react'
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
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CContainer
} from '@coreui/react'

const Order = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedPaket, setLoadedPaket] = useState()

    const [modalOrder, setModalOrder] = useState(false)
    const [total, setTotal] = useState(0)

    const [dataOrder, setDataOrder] = useState({
        nama: '',
        email: '',
        telepon: '',
        laundry: [],
        uangMuka: 0
    })

    const history = useHistory()

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/paket')
                setLoadedPaket(responseData.paket)
            } catch (err) {}
        }
        fetchPaket()
    }, [sendRequest])

    const tambahBarangHandler = (paket) => {
        const priceAddition = loadedPaket[paket].harga
        const oldPrice = total
        const newPrice = oldPrice + priceAddition
        let totalAddition = loadedPaket[paket].jumlah
        const newTotalPaket = totalAddition + 1
        totalAddition = newTotalPaket
        const newPaket = loadedPaket
        newPaket[paket].jumlah = totalAddition
        setLoadedPaket(newPaket)
        setTotal(newPrice)
    }

    const kurangBarangHandler = (paket) => {
        const priceDeduction = loadedPaket[paket].harga
        const oldPrice = total
        const newPrice = oldPrice - priceDeduction
        let totalAddition = loadedPaket[paket].jumlah
        const newTotalPaket = totalAddition - 1
        totalAddition = newTotalPaket
        const newPaket = loadedPaket
        newPaket[paket].jumlah = totalAddition
        setLoadedPaket(newPaket)
        setTotal(newPrice)
    }

    const orderButtonHandler = () => {
        let data = {...dataOrder}
        setModalOrder(!modalOrder)
        let daftarOrder = []
        loadedPaket.map((p, idx) => {
            if(p.jumlah !== 0) {
                daftarOrder.push(p)
            }
        })
        data.laundry = daftarOrder
        setDataOrder(data)
    }

    const changeInputOrderHandler = e => {
        let data = {...dataOrder}
        if(e.target.name === "nama") {
            data.nama = e.target.value
        } else if(e.target.name === "email") {
            data.email = e.target.value
        } else if(e.target.name === 'telepon') {
            data.telepon = e.target.value
        } else if(e.target.name === 'pembayaran') {
            data.uangMuka = e.target.value
        }
        setDataOrder(data)
    }

    const finishOrderHandler = async (event) => {
        event.preventDefault()
        console.log(dataOrder)
        try {
            await sendRequest(
                'http://localhost:5000/transaksi',
                'POST',
                JSON.stringify({
                    nama: dataOrder.nama,
                    email: dataOrder.email,
                    telepon: dataOrder.telepon,
                    laundry: dataOrder.laundry,
                    uangMuka: dataOrder.uangMuka
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            history.push('/laundry/kelolaTransaksi')
            
        } catch (err) {}
        setModalOrder(!modalOrder)
    }

    let buttonOrder
    if(total>1) {
        buttonOrder = <CButton block variant="outline" color="success" onClick={orderButtonHandler}>Order</CButton>
    } else {
        buttonOrder = <CButton block variant="outline" color="success" onClick={() => setModalOrder(!modalOrder)} disabled>Order</CButton>
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

            {!isLoading && loadedPaket && 
                <CContainer fluid>
                    <CRow>
                        <CCol sm="3">
                            <h2>Laundry</h2>
                        </CCol>
                        <CCol sm="3"></CCol>
                        <CCol sm="3">
                            <h3>Rp {total}</h3>
                        </CCol>
                        <CCol sm="3">
                            {buttonOrder}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol cm="12">
                            <CForm>
                                <CCard borderColor="primary">
                                    <CCardBody>
                                        <Table responsive hover striped>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Barang</th>
                                                    <th>Jenis</th>
                                                    <th>Harga Satuan</th>
                                                    <th className="text-center">Jumlah Pesanan</th>
                                                    <th className="text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loadedPaket.map((paket, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{paket.nama}</td>
                                                        <td>{paket.jenis}</td>
                                                        <td>Rp {paket.harga}</td>
                                                        <td className="text-center">
                                                            <h5>{paket.jumlah}</h5>
                                                        </td>
                                                        <td className="text-center">
                                                            <CCol>
                                                                <CButton size="sm" shape="pill" color="danger" onClick={() => kurangBarangHandler(idx)}>-</CButton>
                                                                <CButton size="sm" shape="pill" color="primary" onClick={() => tambahBarangHandler(idx)}>+</CButton>
                                                            </CCol>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </CCardBody>
                                </CCard>
                            </CForm>
                        </CCol>
                    </CRow>
                </CContainer>
            }
            
            <CModal
                color="success"
                onClose={() => setModalOrder(!modalOrder)}
                show={modalOrder}
            >
                <CForm onSubmit={finishOrderHandler}>
                    <CModalHeader>
                        <CModalTitle>Invoice Order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Nama</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="nama" name="nama" placeholder="Masukkan nama pelanggan" onChange={changeInputOrderHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Email</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="email" id="email" name="email" placeholder="Masukkan email pelanggan" onChange={changeInputOrderHandler}/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>No Telepon</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="number" id="telepon" name="telepon" placeholder="Masukkan no telepon pelanggan" onChange={changeInputOrderHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Biaya Transaksi</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="total" name="total" disabled placeholder={total} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Bayar</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="number" id="pembayaran" name="pembayaran" placeholder="masukkan jumlah pembayaran" onChange={changeInputOrderHandler}/>
                            </CCol>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalOrder(!modalOrder)}>Ganti</CButton>
                        <CButton type="submit" color="success">Proses</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </React.Fragment>
    )
}

export default Order