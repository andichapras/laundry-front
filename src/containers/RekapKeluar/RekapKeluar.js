import React, { useState } from 'react'

import {
    CRow,
    CCol,
    CInput,
    CFormGroup,
    CLabel,
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CDataTable,
    CWidgetIcon,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
    Table
} from 'react-bootstrap'

const RekapKeluar = () => {
    const [dataPengeluaran, setDataPengeluaran] = useState([
        {id: 0, no: 1, tahun: 2020, bulan: 'januari', staff: 2, pengeluaran: 2000000}
    ])

    const [pengeluaranBarang, setPengeluaranBarang] = useState([
        {id: 0, barang: 'detergen', jenis: '10kg', jumlah: 2, harga: '35000'}
    ])

    const [showTambahBarang, setShowTambahBarang] = useState(false)
    const [showTambahGaji, setShowTambahGaji] = useState(false)
    const [showModalBarang, setShowModalBarang] = useState(false)

    const tambahBarangShowHandler = () => {
        const oldTambah = showTambahBarang
        setShowTambahBarang(!oldTambah)
    }

    const tambahGajiShowHandler = () => {
        const oldTambah = showTambahGaji
        setShowTambahGaji(!oldTambah)
    }
    
    const modalBarangShowHandler = () => {
        const oldTambah = showModalBarang
        setShowModalBarang(!oldTambah)
    }

    const kolomLaporan = ['no', 'tahun', 'bulan', 'staff', 'pengeluaran']
    const kolomBarang = ['no', 'barang', 'jenis', 'jumlah', 'harga']

    return (
        <React.Fragment>
            <CRow>
                <CCol>
                    <h2>Pengeluaran</h2>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12" sm="8" lg="9">
                    <CCard>
                        <CCardHeader>
                            Chart
                        </CCardHeader>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="4" lg="3">
                    <CCard>
                        <CCardBody>
                            <CWidgetIcon text="Pengeluaran" header="Rp 2.500.000" color="primary">
                                <CIcon width={18} name="cil-user"/>
                            </CWidgetIcon>
                            <CButton block shape="square" color="primary" onClick={tambahGajiShowHandler}>Tambah Gaji</CButton>
                            <CButton block shape="square" color="info" onClick={tambahBarangShowHandler}>Tambah Pengeluaran</CButton>
                            <CButton block variant="outline" color="info" onClick={modalBarangShowHandler}>Lihat Barang</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    {showTambahGaji && (
                        <CCard>
                        <CCardHeader>
                            <h3>Tambah Untuk Gaji</h3>
                        </CCardHeader>
                        <CCardBody>
                            <Table responsive hover>
                                <thead>
                                    <th>Nama</th>
                                    <th>Bidang Kerja</th>
                                    <th class="text-center">Gaji</th>
                                </thead>
                                <tbody>
                                    
                                        <tr>
                                            <td><CInput id="barang" placeholder="masukkan nama staff" required /></td>
                                            <td><CInput id="jenis" placeholder="masukkan bidang kerja staff" required /></td>
                                            <td><CInput id="harga" placeholder="masukkan gaji staff" required /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><CButton block color="primary">Tambah</CButton></td>
                                        </tr>
                                    
                                </tbody>
                            </Table>
                        </CCardBody>
                    </CCard>
                    )}
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    {showTambahBarang && (
                        <CCard>
                        <CCardHeader>
                            <h3>Tambah Pengeluaran Barang</h3>
                        </CCardHeader>
                        <CCardBody>
                            <Table responsive hover>
                                <thead>
                                    <th>Barang</th>
                                    <th>jenis</th>
                                    <th>Jumlah</th>
                                    <th class="text-center">Harga</th>
                                </thead>
                                <tbody>
                                    
                                        <tr>
                                            <td><CInput id="barang" placeholder="masukkan nama barang" required /></td>
                                            <td><CInput id="jenis" placeholder="masukkan jenis barang" required /></td>
                                            <td><CInput id="jumlah" placeholder="masukkan Jumlah barang" required /></td>
                                            <td><CInput id="harga" placeholder="masukkan harga barang" required /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><CButton block color="primary">Tambah</CButton></td>
                                        </tr>
                                    
                                </tbody>
                            </Table>
                        </CCardBody>
                    </CCard>
                    )}
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12" xs="12">
                    <CCard>
                        <CCardHeader>
                            <CFormGroup row>
                            <CCol>
                                <h4>Laporan Pengeluaran</h4>
                            </CCol>
                            <CCol>
                                <CInput type="date" id="tanggal" name="tanggal" placeholder="Masukkan Tanggal" />
                            </CCol>
                            </CFormGroup>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataPengeluaran}
                                fields={kolomLaporan}
                                itemsPerPage={10}
                                pagination
                                hover />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CModal
                color="info"
                onClose={modalBarangShowHandler}
                show={showModalBarang}
            >
                <CModalHeader>
                    <CModalTitle>Tabel Pengeluaran Barang</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CDataTable 
                        items={pengeluaranBarang}
                        fields={kolomBarang}
                        itemsPerPage={10}
                        pagination
                        hover
                        scopedSlots = {{
                            'no': (item, idx) => (
                                <td>{idx + 1}</td>
                            ),
                            'jumlah': (item, idx) => (
                                <td style={{textAlign: "center"}}>{item.jumlah}</td>
                            )
                        }}
                    />
                </CModalBody>
            </CModal>
        </React.Fragment>
    )
}

export default RekapKeluar