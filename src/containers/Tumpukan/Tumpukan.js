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

const Tumpukan = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedTransaksiForAmbil, setLoadedTransaksiForAmbil] = useState()

    const kolomTumpukan = ['tgl transaksi', 'nama', 'email', 'telepon', 'barang']

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/transaksi/status/ambil')
                setLoadedTransaksiForAmbil(responseData.transaksiForAmbil)
            } catch (err) {}
        }
        fetchTransaksi()
    }, [sendRequest])

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

            {!isLoading && loadedTransaksiForAmbil && 
                (
                    <CContainer fluid>
                        <CRow>
                            <CCol>

                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CForm>
                                    <CCard>
                                        <CCardBody>
                                            <CDataTable 
                                                items={loadedTransaksiForAmbil}
                                                fields={kolomTumpukan}
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
                                                    'barang':
                                                    (item, idx) => (
                                                        <td>{item.laundry.length}</td>
                                                    )
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </CForm>
                            </CCol>
                        </CRow>
                    </CContainer>
                )
            }
        </React.Fragment>
    )
}

export default Tumpukan