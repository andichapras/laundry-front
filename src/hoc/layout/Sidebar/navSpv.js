export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Home',
        to: '/laundry/home',
        icon: 'cil-home',
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Transaksi'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Order',
        to: '/laundry/order',
        icon: 'cil-credit-card'
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Ambil Barang',
        to: '/laundry/ambil',
        icon: 'cil-check'
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Pengelolaan']
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Transaksi',
        to: '/laundry/kelolaTransaksi',
        icon: 'cil-task'
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Paket',
        to: '/laundry/kelolaPaket',
        icon: 'cil-tags'
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Keuangan'],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Rekap Transaksi',
        icon: 'cil-square',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Pemasukan',
                to: '/laundry/pemasukan',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Pengeluaran',
                to: '/laundry/pengeluaran',
            },
        ],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Laporan Keuangan',
        to: '/laundry/laporan',
        icon: 'cil-file'
    },
]