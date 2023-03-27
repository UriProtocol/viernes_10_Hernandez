import React, {useState, useEffect} from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {gapi} from 'gapi-script'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Container } from 'react-bootstrap';


function Login(){

    const key_login = "256337036389-m7kod154bkr58v44g8qchbs07rrgqn3t.apps.googleusercontent.com";

    const [user, setUser] = useState({tipo_login: 'ninguno'})


    //Todavía no funciona
    useEffect(() => {
      const start = () =>{
        gapi.Auth2.init({
          clientId: key_login
        })
      }
      gapi.load("client:auth2", start)
    }, [])    


    const login_google = (respuesta_exitosa) => 
      {
         setUser({...respuesta_exitosa.profileObj, tipo_login: 'google'})
         Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: '¡Ingresado con éxito!',
        })
      }
    const fallo_login = (res) => 
      {
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal...',
            text: 'Hubo un problema al iniciar sesión',
          })
      }
      const logout=()=>{
        console.log("SESIÓN TERMINADA HERNANDEZ ESCAMILLA");
        Swal.fire({
          icon: 'success',
          title: 'Adiós',
          text: 'Sesión cerrada con éxito',
        })  
        setUser({tipo_login: 'ninguno'})
      } 

      const login_facebook = (response) => {
        setUser({...response, tipo_login: 'facebook'})
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: '¡Ingresado con éxito!',
        })

      }

      //Creando el contenido que se va a renderizar en la página de manera condicional
      let loginRender
      
      //Si el usuario no se ha logeado, se renderizará el formulario de login, en caso de que se encuentre logeado, se renderizará una de las tarjetas de usuario
      if(user.tipo_login === 'ninguno'){ //Si el usuario aún no se ha logeado
        loginRender = (
          <>
            <h2 className='text-center mb-5 mt-2'>Login</h2>

            <Form className='border rounded shadow-sm px-5 pt-5 pb-2 mx-5 bg-white'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo" />
               
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" />
                <Form.Text className='mt-3'>
                  En ocasiones es necesario cambiar de pestaña un par de veces para que funcione el login de Google
                </Form.Text>
              </Form.Group>
             <Container className='text-center my-4'>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
             </Container>
              <div className='login-register text-center'>
                <p>¿No eres usuario?<Link className='ms-2'>Registrate</Link></p>
                <p>O ingresa con: </p>
                <p>
                    <GoogleLogin
                      clientId={key_login}
                      buttonText="INGRESAR"
                      onSuccess={login_google}
                      onFailure={fallo_login}
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={false}
                      autoLoad={false}
                      // redirectUri='https://www.hackerutd.online/gonzalezu/login'
                      render={(renderProps) =>(
                        <FaGoogle onClick={renderProps.onClick} className='fs-5 mx-2' style={{cursor: 'pointer'}}></FaGoogle>
                      )}
                    />
                    <FacebookLogin
                      appId="155323180720237"
                      autoLoad={false}
                      fields="name,email,picture"
                      // onClick={componentClicked}
                      callback={login_facebook}
                      onFailure={fallo_login}
                      render={(renderProps) =>(
                        <FaFacebook onClick={renderProps.onClick} className='fs-5 mx-2' style={{cursor: 'pointer'}}></FaFacebook>
                      )}
                    />
                  </p>
              </div>
              </Form>
        
          </>
        )
      }else{
        if(user.tipo_login === 'google'){ // Si el usuario se ha logeado con google
          loginRender = (
            <div className='p-4 my-5 mx-auto border shadow-sm bg-white w-25 text-center'>
              <img src={user.imageUrl} alt='Imagen de usuario'></img>
              <p className='my-3'>Tus credenciales de Google son:</p>
              <p><b>Nombre: </b>{user.name}</p>
              <p><b>Email: </b>{user.email}</p>
              <GoogleLogout
                clientId={key_login}
                buttonText={"CERRAR SESIÓN"}
                onLogoutSuccess={logout}
                className='mt-2'
              /> 
            </div>
          )
        }else if(user.tipo_login === 'facebook'){ //Si el usuario se ha logeado con facebook
          loginRender = (
            <div className='p-4 my-5 mx-auto border shadow-sm bg-white w-25 text-center'>
              <img src={user.picture.data.url} alt='Imagen de usuario'></img>
              <p className='my-3'>Tus credenciales de Facebook son:</p>
              <p><b>Nombre: </b>{user.name}</p>
              <p><b>Email: </b>{user.email}</p>
               <button className='logout logout-facebook mt-2' onClick={logout}><FaFacebook className={'me-4'}></FaFacebook> CERRAR SESIÓN</button>
            </div>
          )
        }

      }
  
   return(
    <div className='wrapper-center'>  
      {loginRender}
    </div>      
   )   
}      
export default Login;