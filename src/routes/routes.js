import React from 'react'

import Home from '../containers/Home/Home'
import Order from '../containers/Order/Order'
import KelolaPaket from '../containers/KelolaPaket/KelolaPaket'
import Ambil from '../containers/Ambil/Ambil'
import KelolaTransaksi from '../containers/KelolaTransaksi/KelolaTransaksi'
import RekapMasuk from '../containers/RekapMasuk/RekapMasuk'
import RekapKeluar from '../containers/RekapKeluar/RekapKeluar'
import TambahPengeluaran from '../containers/RekapKeluar/Tambah/Tambah'
import Laporan from '../containers/Laporan/Laporan'

const Routes = [
    { path: '/', exact: true, name: 'Home', component: Home },

    { path: '/order', name: 'Order', component: Order },

    { path: '/ambil', name: 'ambil', component: Ambil },

    { path: '/kelolaTransaksi', name: 'KelolaTransaksi', component: KelolaTransaksi },

    { path: '/kelolaPaket', name: 'KelolaPaket', component: KelolaPaket },

    { path: '/pemasukan', name: 'pemasukan', component: RekapMasuk },

    { path: '/pengeluaran', name: 'pengeluaran', component: RekapKeluar },
    { path: '/pengeluaran-tambah', name: 'pengeluaran-tambah', component: TambahPengeluaran },

    { path: '/laporan', name: 'laporan', component: Laporan },

]

export default Routes