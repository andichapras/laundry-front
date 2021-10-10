import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'

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

const Laporan = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedLaporan, setLoadedLaporan] = useState()
    const [loadedLaporanNow, setLoadedLaporanNow] = useState()

    const [loadedPengeluaranBarang, setLoadedPengeluaranBarang] = useState()
    const [loadedPengeluaranGaji, setLoadedPengeluaranGaji] = useState()

    const [showTambahBarang, setShowTambahBarang] = useState(false)
    const [showTambahGaji, setShowTambahGaji] = useState(false)

    const [showModalBarang, setShowModalBarang] = useState(false)
    const [showModalGaji, setShowModalGaji] = useState(false)

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

    const kolom = ['no', 'tahun', 'bulan', 'transaksi', 'pelanggan', 'pemasukan', 'pengeluaran', 'keuntungan']
    const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const kolomPengeluaranBarang = ['no', 'nama', 'jenis', 'jumlah', 'harga']
    const kolomPengeluaranGaji = ['no', 'nama', 'tugas', 'gaji', 'aksi']

    useEffect(() => {
        const fetchLaporan = async () => {
            try {
                const responseData = await sendRequest('https://ameera-laundry.herokuapp.com/laporan')
                setLoadedLaporan(responseData.laporanUtama)
            } catch (err) {}
        }
        fetchLaporan()
    }, [sendRequest])
    
    // useEffect(() => {
    //     const fetchLaporanNow = async () => {
    //         try {
    //             const responseData = await sendRequest('http://localhost:5000/laporan/now')
    //             setLoadedLaporanNow(responseData.laporanUtamaNow)
    //         } catch (err) {}
    //     }
    //     fetchLaporanNow()
    // }, [sendRequest])

    useEffect(() => {
        const fetchPengeluaranBarang = async () => {
            try {
                const responseData = await sendRequest('https://ameera-laundry.herokuapp.com/laporan/barang')
                console.log(responseData)
                setLoadedPengeluaranBarang(responseData.pengeluaranBarang)
            } catch (err) {}
        }
        fetchPengeluaranBarang()
    }, [sendRequest])
    
    useEffect(() => {
        const fetchGajiPegawai = async () => {
            try {
                const responseData = await sendRequest('https://ameera-laundry.herokuapp.com/laporan/gaji')
                console.log(responseData)
                setLoadedPengeluaranGaji(responseData.gajiPegawai)
            } catch (err) {}
        }
        fetchGajiPegawai()
    }, [sendRequest])

    const showModalHapusPegawaiHandler = (pegawai) => {
        let modalPegawai = [...loadedPengeluaranGaji]
        modalPegawai[pegawai].modal = true
        setLoadedPengeluaranGaji(modalPegawai)
    }

    const closeModalHapusPegawai = () => {
        let modalPegawai = [...loadedPengeluaranGaji]
        modalPegawai.map((gaji, idx) => {
            gaji.modal = false
        })
        setLoadedPengeluaranGaji(modalPegawai)
    }

    const tambahBarangHandler = async (event) => {
        event.preventDefault()
        try {
            await sendRequest(
                'https://ameera-laundry.herokuapp.com/laporan/barang',
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
                'https://ameera-laundry.herokuapp.com/laporan/gaji',
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

    const deleteDataPegawaiHandler = async (e, idx) => {
        e.preventDefault()
        closeModalHapusPegawai()
        modalGajiShowHandler()
        const pegawaiId = loadedPengeluaranGaji[idx]._id
        try {
            await sendRequest(
                `https://ameera-laundry.herokuapp.com/laporan/gaji/${pegawaiId}`,
                'DELETE'
            )
        } catch (err) {

        }
    }

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
    
    const modalGajiShowHandler = () => {
        const oldTambah = showModalGaji
        setShowModalGaji(!oldTambah)
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

            {!isLoading && loadedLaporan && 
                <CContainer fluid>
                    <CRow>
                        <CCol>
                            <h2>Laporan</h2>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" sm="8" lg="9">
                            <CCard>
                                <CCardHeader>
                                    <CFormGroup row>
                                    <CCol>
                                        <h4>Tabel Keuangan</h4>
                                    </CCol>
                                    {/* <CCol>
                                        <CInput type="date" id="tanggal" name="tanggal" placeholder="Masukkan Tanggal" />
                                    </CCol> */}
                                    </CFormGroup>
                                </CCardHeader>
                                <CCardBody>
                                    <CDataTable
                                        items={loadedLaporan}
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
                                            'pemasukan': (item, idx) => (
                                                <td>Rp {item.pemasukan}</td>
                                            ),
                                            'pengeluaran': (item, idx) => (
                                                <td>Rp {item.pengeluaran}</td>
                                            ),
                                            'keuntungan': (item, idx) => (
                                                <td>Rp {item.keuntungan}</td>
                                            )
                                        }} 
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                        
                        {/* <CWidgetIcon text="Jumlah Pelanggan" header={loadedLaporanNow.pelanggan + ' orang'} color="primary">
                            <CIcon width={18} name="cil-user"/>
                        </CWidgetIcon> */}
                            {/* <CRow>
                                <CWidgetIcon text="Keuntungan" header={'Rp ' + loadedLaporanNow.keuntungan} color="success">
                                    <CIcon width={18} name="cil-file"/>
                                </CWidgetIcon>
                            </CRow> */}
                        <CCol lg="3" sm="4" xs="12">

                                <CCard>
                                    <CCardBody>
                                        <CButton block shape="square" color="primary" onClick={tambahGajiShowHandler}>Tambah Pegawai</CButton>
                                        <CButton block shape="square" color="info" onClick={tambahBarangShowHandler}>Tambah Pengeluaran</CButton>
                                        <CButton block variant="outline" color="primary" onClick={modalGajiShowHandler}>Lihat List Pegawai</CButton>
                                        <CButton block variant="outline" color="info" onClick={modalBarangShowHandler}>Lihat List Barang</CButton>
                                    </CCardBody>
                                </CCard>

                        </CCol>
                    </CRow>
                </CContainer>
            }

            {/* Modal tambah pengeluaran */}
            <CModal
                color="info"
                onClose={tambahBarangShowHandler}
                show={showTambahBarang}
            >
                <CForm onSubmit={tambahBarangHandler}>
                    <CModalHeader>
                        <CModalTitle>Silahkan Tambahkan Pengeluaran</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Pengeluaran</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="nama" name="nama" placeholder="masukkan nama barang/pengeluaran" onChange={changeInputBarangHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Jenis</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="jenis" name="jenis" placeholder="masukkan jenis barang/pengeluaran" onChange={changeInputBarangHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Jumlah</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="number" id="jumlah" name="jumlah" placeholder="masukkan Jumlah barang/pengeluaran" onChange={changeInputBarangHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Harga</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="number" id="harga" name="harga" placeholder="masukkan harga barang/pengeluaran" onChange={changeInputBarangHandler} required/>
                            </CCol>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CCol md={{ span: 3, offset: 9 }}>
                            <CButton type="submit" block color="primary">Tambah</CButton>
                        </CCol>
                    </CModalFooter>
                </CForm>
            </CModal>
            <CModal
                color="primary"
                onClose={tambahGajiShowHandler}
                show={showTambahGaji}
            >
                <CForm onSubmit={tambahGajiPegawaiHandler}>
                    <CModalHeader>
                        <CModalTitle>Silahkan Tambahkan Pegawai</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Nama</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="nama" name="nama" placeholder="masukkan nama pegawai" onChange={changeInputGajiHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Tugas Kerja</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="text" id="tugas" name="tugas" placeholder="masukkan tugas kerja" onChange={changeInputGajiHandler} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel>Gaji</CLabel>
                            </CCol>
                            <CCol md="9">
                                <CInput type="number" id="gaji" name="gaji" placeholder="masukkan Jumlah gaji" onChange={changeInputGajiHandler} required/>
                            </CCol>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CCol md={{ span: 3, offset: 9 }}>
                            <CButton type="submit" block color="primary">Tambah</CButton>
                        </CCol>
                    </CModalFooter>
                </CForm>
            </CModal>

            {/* Modal menampilkan pengeluaran perbulan */}
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
            <CModal
                color="info"
                onClose={modalGajiShowHandler}
                show={showModalGaji}
            >
                <CModalHeader>
                    <CModalTitle>Tabel List Pegawai</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CDataTable 
                            items={loadedPengeluaranGaji}
                            fields={kolomPengeluaranGaji}
                            itemsPerPage={10}
                            pagination
                            hover
                            scopedSlots = {{
                                'no': (item, idx) => (
                                    <td>{idx + 1}</td>
                                ),
                                'gaji': (item, idx) => (
                                    <td>Rp {item.gaji}</td>
                                ),
                                'aksi': (item, idx) => (
                                    <CButton block variant="outline" color="danger" onClick={() => showModalHapusPegawaiHandler(idx)}>Pecat</CButton>
                                )
                            }}
                        />
                </CForm>
                </CModalBody>
            </CModal>

            {loadedPengeluaranGaji && loadedPengeluaranGaji.map((pegawai, idx) => {
                if(pegawai.modal === true) {
                    return(
                        <CModal
                            color="danger"
                            show={pegawai.modal}
                            onClose={closeModalHapusPegawai}
                        >
                            <CModalHeader>
                                <CModalTitle>{pegawai.nama}</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <p>Apakah anda yakin ingin memecat pegawai ini?</p>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="danger" onClick={(e) => deleteDataPegawaiHandler(e, idx)}>Iya</CButton>
                            </CModalFooter>
                        </CModal>
                    )
                }
            }) }
            
        </React.Fragment>
    )
}

export default Laporan