import React, { useState, useEffect } from 'react'
// import Moment from 'react-moment'
import moment from 'moment'

import { useHttpClient } from '../../components/hooks/http-hooks'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

import {
    CRow,
    CButton,
    CCol,
    CInput,
    CFormGroup,
    CLabel,
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CDataTable,
    CContainer,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CWidgetIcon
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

const RekapMasuk = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedLaporanPemasukan, setLoadedLaporamPemasukan] = useState()
    const [loadedTransaksiFalse, setLoadedTransaksiFalse] = useState()
    const [loadedLaporanNow, setLoadedLaporanNow] = useState()

    const kolom = ['no', 'tahun', 'bulan', 'transaksi', 'pelanggan', 'pemasukan']
    const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    useEffect(() => {
        const abortController = new AbortController()
        const fetchLaporanPemasukan = async () => {
            try {
                const responseDataLaporan = await sendRequest('http://localhost:5000/laporan/masuk')
                setLoadedLaporamPemasukan(responseDataLaporan.laporanPemasukan)
                console.log(responseDataLaporan)
            } catch (err) {}
        }
        fetchLaporanPemasukan()
        console.log(loadedLaporanPemasukan)
        return () => {
            abortController.abort();
          }
    }, [sendRequest])
    // useEffect(() => {
    //     const abortController = new AbortController()
    //     const fetchLaporanPemasukanNow = async () => {
    //         try {
    //             const responseDataNow = await sendRequest('http://localhost:5000/laporan/now/masuk')
    //             setLoadedLaporanNow(responseDataNow.laporanPemasukanNow)
    //             console.log(responseDataNow)
    //         } catch (err) {}
    //     }
    //     fetchLaporanPemasukanNow()
    //     console.log(loadedLaporanNow)
    //     return () => {
    //         abortController.abort();
    //       }
    // }, [sendRequest])

    // useEffect(() => {
    //     const abortController = new AbortController()
    //     const fetchTransaksiFalse = async () => {
    //         try {
    //             const responseData = await sendRequest('http://localhost:5000/transaksi/status/kelola')
    //             setLoadedTransaksiFalse(responseData.transaksiByStatus)
    //         } catch (err) {}
    //     }
    //     fetchTransaksiFalse()
    //     return () => {
    //         abortController.abort();
    //       }
    // }, [sendRequest])

    

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

            {!isLoading && loadedLaporanPemasukan && 
                <CContainer fluid>
                    <CRow>
                        <CCol>
                            <h2>Pemasukan</h2>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
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
                                        items={loadedLaporanPemasukan}
                                        fields={kolom}
                                        itemsPerPage={10}
                                        pagination
                                        hover
                                        scopedSlots = {{
                                            'no': (item, idx) => (
                                                <td>{idx + 1}</td>
                                            ),
                                            'bulan':
                                            (item, idx) => (
                                                <td>{namaBulan[item.bulan]}</td>
                                            ),
                                            'transaksi':
                                            (item, idx) => (
                                                <td className="text-center">{item.transaksi}</td>
                                            ),
                                            'pemasukan': (item, idx) => (
                                                <td>Rp {item.pemasukan}</td>
                                            )
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                        {/* <CCol xs="12" sm="4" lg="3">
                            <CWidgetIcon text="Pemasukan" header={'Rp ' + loadedLaporanNow.pemasukan} color="success">
                                <CIcon width={18} name="cil-laptop"/>
                            </CWidgetIcon>
                            <CWidgetIcon text="Transaksi Belum Diambil" header={loadedTransaksiFalse.length + ' transaksi'} color="primary">
                                <CIcon width={18} name="cil-user"/>
                            </CWidgetIcon>
                        </CCol> */}
                    </CRow>
                </CContainer>
            }
        </React.Fragment>
    )
}

export default RekapMasuk