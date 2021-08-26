import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AuthContext } from '../components/context/auth-context'
import { useHttpClient } from '../components/hooks/http-hooks'

const Login = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const {isLoading, error, sendRequest, clearError} = useHttpClient()
  const [formUsername, setFormUsername] = useState('')
  const [formPassword, setFormPassword] = useState('')

  const changeFormUsernameHandler = e => {
    let input = formUsername
    input = e.target.value
    setFormUsername(input)
  }
  
  const changeFormPasswordHandler = e => {
    let input = formPassword
    input = e.target.value
    setFormPassword(input)
  }

  const authSpvModeHandler = async (event) => {
    event.preventDefault()
    try {
      await sendRequest(
        'https://ameera-laundry.herokuapp.com/user/spvMode',
        'POST',
        JSON.stringify({
          username: formUsername,
          password: formPassword
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      history.push('/laundry/order')
    } catch (err) {
      console.log(err)
    }
    auth.login()
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={authSpvModeHandler}>
                    <h1>Supervisor</h1>
                    <p className="text-muted">Masukkan data supervisor</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" id="username" name="username" onChange={changeFormUsernameHandler} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" id="password" name="password" onChange={changeFormPasswordHandler} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="success" className="px-4">Masuk</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <Link to="/laundry/order">
                            <CButton color="primary" className="px-3" active tabIndex={-1}>Kembali</CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
