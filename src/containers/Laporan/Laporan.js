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
} from '@coreui/react'

const Laporan = () => {
    const [dataKeuntungan, setDataKeuntungan] = useState([
        {id: 0, no: 1, tahun: 2020, bulan: 'januari', transaksi: 8, pelanggan: 3, staff: 2, keuntungan: 300000}
    ])

    const kolom = ['no', 'tahun', 'bulan', 'transaksi', 'pelanggan', 'staff', 'keuntungan']

    return (
        <React.Fragment>
            <CRow>
                <CCol>
                    <h2>Laporan</h2>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12" sm="8" lg="9">
                    <CCard>
                        <CCardHeader>
                            Keuntungan
                        </CCardHeader>
                    </CCard>
                </CCol>
                <CCol xs="12" sm="4" lg="3">
                    <CCard>
                        <CCardHeader>
                            Manajemen Barang
                        </CCardHeader>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12" xs="12">
                    <CCard>
                        <CCardHeader>
                            <CFormGroup row>
                            <CCol>
                                <h4>Tabel Keuangan</h4>
                            </CCol>
                            <CCol>
                                <CInput type="date" id="tanggal" name="tanggal" placeholder="Masukkan Tanggal" />
                            </CCol>
                            </CFormGroup>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataKeuntungan}
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

export default Laporan