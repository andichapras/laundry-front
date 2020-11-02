import React, { useState } from 'react'

import {
    CRow,
    CCol,
    CButton,
    CInput
} from '@coreui/react'

import {
    Table
} from 'react-bootstrap'

const KelolaPaket = () => {
    const [daftarPaket, setDaftarPaket] = useState([
        {
            barang: 'Pakaian',
            jenis: 'Tidak Luntur',
            harga: 3000 
        },
        {
            barang: 'Pakaian',
            jenis: 'Luntur',
            harga: 3000
        },
        {
            barang: 'Alat Tidur',
            jenis: 'Kecil',
            harga: 4000
        },
        {
            barang: 'Alat Tidur',
            jenis: 'Sedang',
            harga: 6000
        },
        {
            barang: 'Alat Tidur',
            jenis: 'Besar',
            harga: 8000
        },
        {
            barang: 'Sepatu',
            jenis: 'Biasa',
            harga: 25000
        },
        {
            barang: 'Sepatu',
            jenis: 'Kulit',
            harga: 30000
        },
        {
            barang: 'Tas',
            jenis: 'Kecil',
            harga: 15000
        },
        {
            barang: 'Tas',
            jenis: 'Sedang',
            harga: 30000
        },
        {
            barang: 'Tas',
            jenis: 'Sedang',
            harga: 45000
        },
        {
            barang: 'Helm',
            jenis: 'Kecil',
            harga: 15000
        },
        {
            barang: 'Helm',
            jenis: 'Besar',
            harga: 25000
        },
    ])

    return (
        <React.Fragment>
            <CRow>
                <CCol md="3">
                    <h2>Kelola Paket</h2>
                </CCol>
                <CCol md="6"></CCol>
                <CCol md="3">
                    <CButton block shape="pill" color="success">Save</CButton>
                </CCol>
            </CRow>
            <Table responsive hover>
                <thead>
                    <th>No</th>
                    <th>Barang</th>
                    <th>jenis</th>
                    <th class="text-center">Harga</th>
                </thead>
                <tbody>
                    {daftarPaket.map((paket, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{paket.barang}</td>
                            <td>{paket.jenis}</td>
                            <td><CInput id="harga" placeholder={paket.harga} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default KelolaPaket