export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Home',
        to: '/home',
        icon: 'cil-home',
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Transaksi'],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Order',
        to: '/order',
        icon: 'cil-credit-card'
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Ambil Barang',
        to: '/ambil',
        icon: 'cil-check'
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Pengelolaan']
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Transaksi',
        to: '/kelolaTransaksi',
        icon: 'cil-task'
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Paket',
        to: '/kelolaPaket',
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
                to: '/pemasukan',
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Pengeluaran',
                to: '/pengeluaran',
            },
        ],
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Laporan Keuangan',
        to: '/laporan',
        icon: 'cil-file'
    },
]