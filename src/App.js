import React, {useState, useCallback} from 'react';
import { HashRouter, Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './scss/style.scss';

import SpvMode from './auth/spvMode'
import Login from './auth/login'

import Sidebar from './hoc/layout/Sidebar/Sidebar'
import Header from './hoc/layout/Header/Header'

import Order from './containers/Order/Order'
import KelolaPaket from './containers/KelolaPaket/KelolaPaket'
import Ambil from './containers/Ambil/Ambil'
import Cari from './containers/Cari/Cari'
import Tumpukan from './containers/Tumpukan/Tumpukan'
import KelolaTransaksi from './containers/KelolaTransaksi/KelolaTransaksi'
import Laporan from './containers/Laporan/Laporan'
import User from './containers/User/User'
import Pelanggan from './containers/Pelanggan/Pelanggan'

import { AuthContext } from './components/context/auth-context'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMasuk, setIsMasuk] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const masuk = useCallback(() => {
    setIsMasuk(true)
  }, [])

  const keluar = useCallback(() => {
    setIsMasuk(false)
  }, [])

  let routes

  if (isMasuk) {
    routes = (
      <Switch>
        <Route path="/loginSpv" exact>
          <SpvMode />
        </Route>
        <div className="c-app c-default-layout">
          <Sidebar />
          <div className="c-wrapper">
              <Header />
              <div className="c-body">
                  <main className="c-main">
                      <Route path="/laundry/order" exact>
                        <Order />
                      </Route>
                      <Route path="/laundry/ambil" exact>
                        <Ambil />
                      </Route>
                      <Route path="/laundry/cari" exact>
                        <Cari />
                      </Route>
                      <Route path="/laundry/tumpukan" exact>
                        <Tumpukan />
                      </Route>
                      <Route path="/laundry/kelolaTransaksi" exact>
                        <KelolaTransaksi />
                      </Route>
                      <Route path="/laundry/kelolaPaket" exact>
                        <KelolaPaket />
                      </Route>
                      <Route path="/laundry/laporan" exact>
                        <Laporan />
                      </Route>
                      <Route path="/laundry/user" exact>
                        <User />
                      </Route>
                      <Route path="/laundry/pelanggan" exact>
                        <Pelanggan />
                      </Route>
                  </main>
              </div>
          </div>
        </div>
        <Redirect to="/laundry/order" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        isMasuk: isMasuk,
        login: login,
        logout: logout,
        masuk: masuk,
        keluar: keluar
      }
    }>
      <BrowserRouter>
        {/* <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/loginSpv" exact>
            <SpvMode />
          </Route>
        <div className="c-app c-default-layout">
          <Sidebar />
          <div className="c-wrapper">
              <Header />
              <div className="c-body">
                  <main className="c-main">
                      <Route path="/laundry/order" exact>
                        <Order />
                      </Route>
                      <Route path="/laundry/ambil" exact>
                        <Ambil />
                      </Route>
                      <Route path="/laundry/cari" exact>
                        <Cari />
                      </Route>
                      <Route path="/laundry/tumpukan" exact>
                        <Tumpukan />
                      </Route>
                      <Route path="/laundry/kelolaTransaksi" exact>
                        <KelolaTransaksi />
                      </Route>
                      <Route path="/laundry/kelolaPaket" exact>
                        <KelolaPaket />
                      </Route>
                      <Route path="/laundry/laporan" exact>
                        <Laporan />
                      </Route>
                      <Route path="/laundry/user" exact>
                        <User />
                      </Route>
                      <Route path="/laundry/pelanggan" exact>
                        <Pelanggan />
                      </Route>
                      <Redirect to="/laundry/order" />
                  </main>
              </div>
          </div>
        </div>
        </Switch> */}
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  )
  
}

export default App;
