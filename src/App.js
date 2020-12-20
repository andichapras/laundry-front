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
import KelolaTransaksi from './containers/KelolaTransaksi/KelolaTransaksi'
import RekapMasuk from './containers/RekapMasuk/RekapMasuk'
import RekapKeluar from './containers/RekapKeluar/RekapKeluar'
import Laporan from './containers/Laporan/Laporan'

import { AuthContext } from './components/context/auth-context'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let routes

  

  // return (
  //   <AuthContext.Provider value={
  //     {
  //       isLoggedIn: isLoggedIn,
  //       login: login,
  //       logout: logout
  //     }
  //   }>
  //     <BrowserRouter>
  //       <React.Suspense fallback={loading}>
  //         <Switch>
            // <Route exact path="/loginSpv" name="Login SPV" render={props => <SpvMode {...props} />} />
  //           <Route path="/laundry" name="Order" render={props => <Layout {...props}/>} />
  //           <Route path="/" name="Login SPV" render={props => <Login {...props} />} />
  //         </Switch>
  //       </React.Suspense>
  //     </BrowserRouter>
  //   </AuthContext.Provider>
  // )

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
      }
    }>
      <BrowserRouter>
        <Switch>
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
                      <Route path="/laundry/kelolaTransaksi" exact>
                        <KelolaTransaksi />
                      </Route>
                      <Route path="/laundry/kelolaPaket" exact>
                        <KelolaPaket />
                      </Route>
                      <Route path="/laundry/pemasukan" exact>
                        <RekapMasuk />
                      </Route>
                      <Route path="/laundry/pengeluaran" exact>
                        <RekapKeluar />
                      </Route>
                      <Route path="/laundry/laporan" exact>
                        <Laporan />
                      </Route>
                      <Redirect to="/laundry/order" />
                    
                  </main>
              </div>
          </div>
        </div>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
  
}

export default App;
