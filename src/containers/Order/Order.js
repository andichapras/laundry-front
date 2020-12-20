import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

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
} from '@coreui/react'

const Order = () => {
    const [daftarPaket, setDaftarPaket] = useState([
        {
            barang: 'Pakaian',
            jenis: 'Tidak Luntur',
            harga: 3000,
            jumlah: 0 
        },
        {
            barang: 'Pakaian',
            jenis: 'Luntur',
            harga: 3000,
            jumlah: 0 
        },
        {
            barang: 'Alat Tidur',
            jenis: 'Kecil',
            harga: 4000,
            jumlah: 0 
        },
        {
            barang: 'Alat Tidur',
            jenis: 'Sedang',
            harga: 6000,
            jumlah: 0 
        },
        {
            barang: 'Alat Tidur',
            jenis: 'Besar',
            harga: 8000,
            jumlah: 0 
        },
        {
            barang: 'Sepatu',
            jenis: 'Biasa',
            harga: 25000,
            jumlah: 0 
        },
        {
            barang: 'Sepatu',
            jenis: 'Kulit',
            harga: 30000,
            jumlah: 0 
        },
        {
            barang: 'Tas',
            jenis: 'Kecil',
            harga: 15000,
            jumlah: 0 
        },
        {
            barang: 'Tas',
            jenis: 'Sedang',
            harga: 30000,
            jumlah: 0 
        },
        {
            barang: 'Tas',
            jenis: 'Sedang',
            harga: 45000,
            jumlah: 0 
        },
        {
            barang: 'Helm',
            jenis: 'Kecil',
            harga: 15000,
            jumlah: 0 
        },
        {
            barang: 'Helm',
            jenis: 'Besar',
            harga: 25000,
            jumlah: 0 
        },
    ])

    const [modalOrder, setModalOrder] = useState(false)

    const [total, setTotal] = useState(0)

    const tambahBarangHandler = (paket) => {
        const priceAddition = daftarPaket[paket].harga
        const oldPrice = total
        const newPrice = oldPrice + priceAddition
        let totalAddition = daftarPaket[paket].jumlah
        const newTotalPaket = totalAddition + 1
        totalAddition = newTotalPaket
        const newPaket = daftarPaket
        newPaket[paket].jumlah = totalAddition
        setDaftarPaket(newPaket)
        setTotal(newPrice)
    }

    const kurangBarangHandler = (paket) => {
        const priceDeduction = daftarPaket[paket].harga
        const oldPrice = total
        const newPrice = oldPrice - priceDeduction
        let totalAddition = daftarPaket[paket].jumlah
        const newTotalPaket = totalAddition - 1
        totalAddition = newTotalPaket
        const newPaket = daftarPaket
        newPaket[paket].jumlah = totalAddition
        setDaftarPaket(newPaket)
        setTotal(newPrice)
    }

    let buttonOrder
    if(total>1) {
        buttonOrder = <CButton block variant="outline" color="success" onClick={() => setModalOrder(!modalOrder)}>Order</CButton>
    } else {
        buttonOrder = <CButton block variant="outline" color="success" onClick={() => setModalOrder(!modalOrder)} disabled>Order</CButton>
    }

    return (
        <React.Fragment>
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
                                        <th>No</th>
                                        <th>Barang</th>
                                        <th>Jenis</th>
                                        <th>Harga Satuan</th>
                                        <th class="text-center">Jumlah Pesanan</th>
                                        <th class="text-center">Aksi</th>
                                    </thead>
                                    <tbody>
                                        {daftarPaket.map((paket, idx) => (
                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>{paket.barang}</td>
                                                <td>{paket.jenis}</td>
                                                <td>Rp {paket.harga}</td>
                                                <td class="text-center">
                                                    <h5>{paket.jumlah}</h5>
                                                </td>
                                                <td class="text-center">
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
            <CModal
                color="success"
                onClose={() => setModalOrder(!modalOrder)}
                show={modalOrder}
            >
                <CForm>
                    <CModalHeader>
                        <CModalTitle>Invoice Order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Nama</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="nama-pelanggan" name="nama-pelanggan" placeholder="Masukkan nama pelanggan" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Email</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="email" id="email-pelanggan" name="email-pelanggan" placeholder="Masukkan email pelanggan" />
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
                                <CInput type="number" id="pembayaran" name="pembayaran" placeholder="masukkan jumlah pembayaran" />
                            </CCol>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setModalOrder(!modalOrder)}>Ganti</CButton>{' '}
                        <CButton color="success" onClick={() => setModalOrder(!modalOrder)}>Proses</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </React.Fragment>
    )
}

export default Order