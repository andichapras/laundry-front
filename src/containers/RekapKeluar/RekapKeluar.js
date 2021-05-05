import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Moment from 'react-moment'

import { useHttpClient } from '../../components/hooks/http-hooks'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

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
    CCardFooter,
    CContainer
} from '@coreui/react'

import CIcon from '@coreui/icons-react'


const RekapKeluar = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedPengeluaranBarang, setLoadedPengeluaranBarang] = useState()
    const [loadedLaporanPengeluaran, setLoadedLaporanPengeluaran] = useState()

    const [dataPengeluaran, setDataPengeluaran] = useState([
        {id: 0, tahun: 2020, bulan: 'januari', staff: 2, pengeluaran: 2000000}
    ])

    // const [pengeluaranBarang, setPengeluaranBarang] = useState([
    //     {id: 0, barang: 'detergen', jenis: '10kg', jumlah: 2, harga: '35000'}
    // ])

    const [showTambahBarang, setShowTambahBarang] = useState(false)
    const [showTambahGaji, setShowTambahGaji] = useState(false)
    const [showModalBarang, setShowModalBarang] = useState(false)

    const [inputBarang, setInputBarang] = useState({
        nama: '',
        jenis: '',
        jumlah: 0,
        harga: 0
    })

    const [inputGaji, setInputGaji] = useState({
        nama: '',
        tugas: '',
        gaji: 0
    })

    const history = useHistory()

    useEffect(() => {
        const fetchPengeluaranBarang = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/laporan/keluar/barang')
                console.log(responseData)
                setLoadedPengeluaranBarang(responseData.pengeluaranBarang)
            } catch (err) {}
        }
        fetchPengeluaranBarang()
    }, [sendRequest])
    
    useEffect(() => {
        const fetchLaporanPengeluaran = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/laporan/keluar')
                console.log(responseData)
                setLoadedLaporanPengeluaran(responseData.laporanPengeluaran)
            } catch (err) {}
        }
        fetchLaporanPengeluaran()
    }, [sendRequest])

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

    const changeInputBarangHandler = e => {
        let input = {...inputBarang}
        if(e.target.name === "nama") {
            input.nama = e.target.value
        } else if(e.target.name === "jenis") {
            input.jenis = e.target.value
        } else if(e.target.name === "jumlah") {
            input.jumlah = e.target.value
        } else if(e.target.name === "harga") {
            input.harga = e.target.value
        }
        setInputBarang(input)
    }

    const changeInputGajiHandler = e => {
        let input = {...inputGaji}
        if(e.target.name === "nama") {
            input.nama = e.target.value
        } else if(e.target.name === "tugas") {
            input.tugas = e.target.value
        } else if(e.target.name === "gaji") {
            input.gaji = e.target.value
        }
        setInputGaji(input)
    }

    const tambahBarangHandler = async (event) => {
        event.preventDefault()
        try {
            await sendRequest(
                'http://localhost:5000/laporan/keluar/barang',
                'POST',
                JSON.stringify({
                    nama: inputBarang.nama,
                    jenis: inputBarang.jenis,
                    jumlah: inputBarang.jumlah,
                    harga: inputBarang.harga
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            history.push('/laundry/order')
        } catch (err) {}
    }

    const tambahGajiPegawaiHandler = async (event) => {
        event.preventDefault()
        try {
            await sendRequest(
                'http://localhost:5000/laporan/keluar/gaji',
                'POST',
                JSON.stringify({
                    nama: inputGaji.nama,
                    tugas: inputGaji.tugas,
                    gaji: inputGaji.gaji
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            history.push('/laundry/order')
        } catch (err) {}
    }

    const kolomLaporan = ['no', 'tahun', 'bulan', 'pegawai', 'pengeluaran']
    const kolomPengeluaranBarang = ['no', 'nama', 'jenis', 'jumlah', 'harga']
    const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

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

            {!isLoading && loadedPengeluaranBarang && 
                <CContainer fluid>
                    <CRow>
                        <CCol>
                            <h2>Pengeluaran</h2>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" sm="8" lg="9">
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
                                        items={loadedLaporanPengeluaran}
                                        fields={kolomLaporan}
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
                                            'pengeluaran': (item, idx) => (
                                                <td>Rp {item.pengeluaran}</td>
                                            )
                                        }} 
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol xs="12" sm="4" lg="3">
                            <CCard>
                                <CCardBody>
                                    {/* <CWidgetIcon text="Pengeluaran" header={'Rp ' + loadedLaporanPengeluaran.pengeluaran} color="success">
                                        <CIcon width={18} name="cil-laptop"/>
                                    </CWidgetIcon> */}
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
                                    <CForm onSubmit={tambahGajiPegawaiHandler}>
                                        <CCardHeader>
                                            <h3>Tambah Untuk Gaji</h3>
                                        </CCardHeader>
                                        <CCardBody>
                                            <Table responsive hover striped>
                                                <thead>
                                                    <th>Nama</th>
                                                    <th>Tugas Kerja</th>
                                                    <th class="text-center">Gaji</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><CInput id="nama" name="nama" placeholder="masukkan nama pegawai" required onChange={changeInputGajiHandler} /></td>
                                                        <td><CInput id="tugas" name="tugas" placeholder="masukkan tugas pegawai" required onChange={changeInputGajiHandler} /></td>
                                                        <td><CInput id="gaji" name="gaji" placeholder="masukkan gaji" required onChange={changeInputGajiHandler} /></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CCol md={{ span: 3, offset: 9 }}>
                                                <CButton type="submit" block color="primary">Tambah</CButton>
                                            </CCol>
                                        </CCardFooter>
                                </CForm>
                            </CCard>
                            )}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            {showTambahBarang && (
                                <CCard>
                                    <CForm onSubmit={tambahBarangHandler}>
                                        <CCardHeader>
                                            <h3>Tambah Pengeluaran Barang</h3>
                                        </CCardHeader>
                                        <CCardBody>
                                            <Table responsive hover striped>
                                                <thead>
                                                    <th>Barang</th>
                                                    <th>jenis</th>
                                                    <th>Jumlah</th>
                                                    <th class="text-center">Harga</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><CInput type="text" id="nama" name="nama" placeholder="masukkan nama barang" required onChange={changeInputBarangHandler} /></td>
                                                        <td><CInput type="text" id="jenis" name="jenis" placeholder="masukkan jenis barang" onChange={changeInputBarangHandler} /></td>
                                                        <td><CInput type="number" id="jumlah" name="jumlah" placeholder="masukkan Jumlah barang" required onChange={changeInputBarangHandler} /></td>
                                                        <td><CInput type="number" id="harga" name="harga" placeholder="masukkan harga barang" required onChange={changeInputBarangHandler} /></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </CCardBody>
                                        <CCardFooter>
                                            <CCol md={{ span: 3, offset: 9 }}>
                                                <CButton type="submit" block color="primary">Tambah</CButton>
                                            </CCol>
                                        </CCardFooter>
                                    </CForm>
                                </CCard>
                            )}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="12" xs="12">
                            
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
                                items={loadedPengeluaranBarang}
                                fields={kolomPengeluaranBarang}
                                itemsPerPage={10}
                                pagination
                                hover
                                scopedSlots = {{
                                    'no': (item, idx) => (
                                        <td>{idx + 1}</td>
                                    ),
                                    'jumlah': (item, idx) => (
                                        <td style={{textAlign: "center"}}>{item.jumlah}</td>
                                    ),
                                    'harga': (item, idx) => (
                                        <td>Rp {item.harga}</td>
                                    )
                                }}
                            />
                        </CModalBody>
                    </CModal>
                </CContainer>
            }
        </React.Fragment>
        
    )
}

export default RekapKeluar