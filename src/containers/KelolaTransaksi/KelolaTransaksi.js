import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

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
} from '@coreui/react'



const KelolaTransaksi = () => {
    const [dataTransaksi, setDataTransaksi] = useState([
        {id: 0, tgl: '01/01/2012', nama: 'andicha', nota: '1231', harga: 12000, aksi: false},
        {id: 1, tgl: '02/02/2012', nama: 'pras', nota: '1231', harga: 12000, aksi: false}
    ])
    
    const switchButtonHandler = (id) => {
        let newArr = [...dataTransaksi]
        newArr[id].aksi = true
        setDataTransaksi(newArr)
    }

    const kolom = ['tgl', 'nama', 'nota', 'harga', 'aksi']

    return (
        <React.Fragment>
            <CRow>
                <CCol>
                    <h3>Kelola Transaksi</h3>
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
                                items={dataTransaksi}
                                fields={kolom}
                                itemsPerPage={10}
                                pagination
                                hover
                                scopedSlots = {{
                                    'aksi':
                                    (item, idx) => (
                                        <td>
                                            <CButton block variant="outline" color={!item.aksi ? 'primary' : 'success'} onClick={() => switchButtonHandler(idx)}>
                                                {!item.aksi ? 'Proses' : 'Selesai'}
                                            </CButton>
                                        </td>
                                    )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </React.Fragment>
    )
}

export default KelolaTransaksi