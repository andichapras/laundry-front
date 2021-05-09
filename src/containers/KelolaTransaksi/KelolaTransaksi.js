import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Moment from 'react-moment'

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
    CModalTitle
} from '@coreui/react'



const KelolaTransaksi = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedTransaksi, setLoadedTransaksi] = useState()
    
    const kolom = ['tanggal', 'nama', 'nota', 'totalBayar', 'status']
    
    const history = useHistory()

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/transaksi/status/kelola')
                console.log(responseData)
                setLoadedTransaksi(responseData.transaksiByStatus)
            } catch (err) {}
        }
        fetchTransaksi()
    }, [sendRequest])

    const showModalfinishHandler = (trans) => {
        let newTransaksi = [...loadedTransaksi]
        newTransaksi[trans].modal = true
        setLoadedTransaksi(newTransaksi)
    }

    const closeModalFinishHandler = () => {
        let newTranasksi = [...loadedTransaksi]
        newTranasksi.map((paket, idx) => {
            paket.modal = false
        })
        setLoadedTransaksi(newTranasksi)
    }

    const finishTransaksi = async (event, idx) => {
        event.preventDefault()
        let newArr = [...loadedTransaksi]
        newArr[idx].status = true
        setLoadedTransaksi(newArr)
        const transId = loadedTransaksi[idx].id
        try{
            await sendRequest(
                `http://localhost:5000/transaksi/${transId}`,
                'PATCH',
                JSON.stringify({}),
                {
                    'Content-Type': 'application/json'
                }
            )
        }  catch (err) { }
        closeModalFinishHandler()
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

            {!isLoading && loadedTransaksi && 
                <CContainer fluid>
                    <CRow>
                        <CCol>
                            <h3>Kelola Barang</h3>
                        </CCol>
                        <CCol md="4">
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="date-input" style={{textAlign: 'right'}}>Masukkan Tanggal :</CLabel>
                                </CCol>
                                <CCol xs="6">
                                    <CInput type="date" id="tanggal" name="tanggal" placeholder="Masukkan Tanggal" />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CCard>
                                <CCardBody>
                                    <CDataTable
                                        items={loadedTransaksi}
                                        fields={kolom}
                                        itemsPerPage={10}
                                        pagination
                                        hover
                                        scopedSlots = {{
                                            'tanggal':
                                            (item, idx) => (
                                                <td>
                                                    <Moment format="DD/MM/YYYY">
                                                        {item.tanggal}
                                                    </Moment>
                                                </td>
                                            ),
                                            'nota':
                                            (item, idx) => (
                                                <td>{item.id}</td>
                                            ),
                                            'status':
                                            (item, idx) => (
                                                <td>
                                                    <CButton type="submit" block variant="outline" color={!item.status ? 'primary' : 'success'} onClick={() => showModalfinishHandler(idx)}>
                                                        {!item.status ? 'Proses' : 'Selesai'}
                                                    </CButton>
                                                </td>
                                            )
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            }

            {loadedTransaksi && loadedTransaksi.map((trans, idx) => {
                if(trans.modal === true) {
                    return(
                        <CForm onSubmit={(e) => finishTransaksi(e, idx)}>
                            <CModal
                                color="success"
                                show={trans.modal}
                                onClose={closeModalFinishHandler}
                            >
                                <CModalHeader>
                                    <CModalTitle>{trans.nama}</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CLabel>Apakah barang order ini selesai?</CLabel>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton type="submit" color="primary">Selesai</CButton>
                                </CModalFooter>
                            </CModal>
                        </CForm>
                    )
                }
            })
            }
        </React.Fragment>
    )
}

export default KelolaTransaksi