import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../components/hooks/http-hooks'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

import {
    CRow,
    CCol,
    CButton,
    CInput,
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CFormGroup,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CContainer
} from '@coreui/react'

import {
    Table
} from 'react-bootstrap'

const KelolaPaket = () => {
    const history = useHistory()
    
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedPaket, setLoadedPaket] = useState()

    const [hargaModal, setHargaModal] = useState(0)

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                // const responseData = await sendRequest('http://localhost:5000/paket')
                const responseData = await sendRequest('https://ameera-laundry.herokuapp.com/paket')
                setLoadedPaket(responseData.paket)
                console.log(loadedPaket)
            } catch (err) {}
        }
        fetchPaket()
    }, [sendRequest])

    const showModalEditHandler = (paket) => {
        let newPaket = [...loadedPaket]
        newPaket[paket].modal = true
        setLoadedPaket(newPaket)
        console.log(loadedPaket)
    }

    const closeModalHandler = () => {
        let newPaket = [...loadedPaket]
        newPaket.map((paket, idx) => {
            paket.modal = false
        })
        setLoadedPaket(newPaket)
    }

    const hargaChange = (event) => {
        let a = event.target.value
        setHargaModal(a)
        console.log(hargaModal)
    }
    
    const editHarga = async (event,idx) => {
        event.preventDefault()
        const paketId = loadedPaket[idx].id
        try {
            await sendRequest(
                `http://localhost:5000/paket/${paketId}`, 
                'PATCH', 
                JSON.stringify({
                    harga: hargaModal
                }), 
                {
                    'Content-Type': 'application/json'
                }
            )
            history.push('/laundry/order')
        } catch (err) {

        }
        console.log(loadedPaket)
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
                        <CCol md="3">
                            <h2>Kelola Paket</h2>
                        </CCol>
                        <CCol md="6"></CCol>
                    </CRow>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Barang</th>
                                <th>jenis</th>
                                <th className="text-center">Harga</th>
                                <th classname="text-center">Ubah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadedPaket.map((paket, idx) => (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{paket.nama}</td>
                                    <td>{paket.jenis}</td>
                                    <td><CInput type="text" id="harga" placeholder={paket.harga} disabled /></td>
                                    <td>
                                        <CButton block variant="outline" color="primary" onClick={() => showModalEditHandler(idx)}>Ubah Harga</CButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CContainer>
            }
            
            {loadedPaket && loadedPaket.map((paket, idx) => {
                if(paket.modal === true) {
                    return(
                        <CForm onSubmit={(e) => editHarga(e, idx)}>
                            <CModal
                                color="primary"
                                show={paket.modal}
                                onClose={closeModalHandler}
                            >
                                <CModalHeader>
                                    <CModalTitle>{paket.nama}</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CFormGroup>
                                        <CCol md="3">
                                            <CLabel>Jenis</CLabel>
                                        </CCol>
                                        <CCol md="9">
                                            <CInput id="harga" placeholder={paket.jenis} disabled />
                                        </CCol>
                                    </CFormGroup>
                                    <CFormGroup>
                                        <CCol md="3">
                                            <CLabel>Harga</CLabel>
                                        </CCol>
                                        <CCol md="9">
                                            <CInput type="number" id="harga" placeholder={paket.harga} onInput={hargaChange} />
                                        </CCol>
                                    </CFormGroup>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton type="submit" color="primary">Ubah</CButton>
                                </CModalFooter>
                            </CModal>
                        </CForm>
                    )
                }
            })}
            
        </React.Fragment>
    )
}

export default KelolaPaket