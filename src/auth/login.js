import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { AuthContext } from '../components/context/auth-context'
import { useHttpClient } from '../components/hooks/http-hooks'
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

  const authSubmitHandler = async event => {
    event.preventDefault()

    try {
      await sendRequest(
        'http://localhost:5000/user/login',
        'POST',
        JSON.stringify({
          username: formUsername,
          password: formPassword
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      auth.masuk()
    } catch (err) {
      alert(err)
    }
    history.push('/laundry/order')
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={authSubmitHandler}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" id="username" name="username" onChange={changeFormUsernameHandler} required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" id="password" name="password" onChange={changeFormPasswordHandler} required />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                          <CButton type="submit" color="primary" className="mt-3" active tabIndex={-1}>Login</CButton>
                        {/* <Link to="/laundry/order">
                            <CButton color="primary" className="mt-3" active tabIndex={-1}>Login</CButton>
                        </Link> */}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
