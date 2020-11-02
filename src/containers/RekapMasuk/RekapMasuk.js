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
    CWidgetIcon
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const RekapMasuk = () => {
    const [dataPemasukan, setDataPemasukan] = useState([
        {id: 0, no: 1, tahun: 2020, bulan: 'januari', transaksi: 8, pelanggan: 3, pemasukan: 120000}
    ])

    const kolom = ['no', 'tahun', 'bulan', 'transaksi', 'pelanggan', 'pemasukan']

    return (
        <React.Fragment>
            <CRow>
                <CCol>
                    <h2>Pemasukan</h2>
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
                    <CWidgetIcon text="Pemasukan" header="Rp 245.000" color="primary">
                        <CIcon width={18} name="cil-user"/>
                    </CWidgetIcon>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12" xs="12">
                    <CCard>
                        <CCardHeader>
                            <CFormGroup row>
                            <CCol>
                                <h4>Laporan Pemasukan</h4>
                            </CCol>
                            <CCol>
                                <CInput type="date" id="tanggal" name="tanggal" placeholder="Masukkan Tanggal" />
                            </CCol>
                            </CFormGroup>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataPemasukan}
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

export default RekapMasuk