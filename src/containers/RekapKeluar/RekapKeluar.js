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
    CButton
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
    Table
} from 'react-bootstrap'

const RekapKeluar = () => {
    const [dataPengeluaran, setDataPengeluaran] = useState([
        {id: 0, no: 1, tahun: 2020, bulan: 'januari', staff: 2, pengeluaran: 2000000}
    ])

    const [showTabelTambah, setShowTabelTambah] = useState(false)

    const tambahTampilHandler = () => {
        const oldTambah = showTabelTambah
        setShowTabelTambah(!oldTambah)
    }

    const kolom = ['no', 'tahun', 'bulan', 'staff', 'pengeluaran']

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
                            <CButton block shape="square" color="info" onClick={tambahTampilHandler}>Tambah Pengeluaran</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    {showTabelTambah && (
                        <CCard>
                        <CCardHeader>
                            <h3>Tambah Pengeluaran</h3>
                        </CCardHeader>
                        <CCardBody>
                            <Table responsive hover>
                                <thead>
                                    <th>Barang</th>
                                    <th>jenis</th>
                                    <th class="text-center">Harga</th>
                                </thead>
                                <tbody>
                                    
                                        <tr>
                                            <td><CInput id="barang" placeholder="masukkan nama barang" required /></td>
                                            <td><CInput id="jenis" placeholder="masukkan jenis barang" required /></td>
                                            <td><CInput id="harga" placeholder="masukkan harga barang" required /></td>
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
                                fields={kolom}
                                itemsPerPage={10}
                                pagination
                                hover />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </React.Fragment>
    )
}

export default RekapKeluar