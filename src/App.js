import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Navbar  from "react-bootstrap/Navbar";
import Nav  from "react-bootstrap/Nav";
import Container  from "react-bootstrap/Container";
import {FaReact} from 'react-icons/fa'
import {BsGithub} from 'react-icons/bs'
import Button  from "react-bootstrap/Button";
//import img from "./imgs/fotopro.jpg";

import Carrusel from "./carrusel";
import GoogleMap from './mapsAPI'
import cv from './files/cv.pdf';
import Login from "./login";
import mockup from './img/mockup.jpeg'


//npm install: 
//reactstrap
//google-maps-react --force
//react bootstrap (npm install react-bootstrap bootstrap)
//react-places-autocomplete --force
//react-router-dom


function Home() {
  return (
    <div className="home-wrapper">
      <h1 className="home text-center mt-4">Inicio</h1>
      <div className="home2">
      <div className="border shadow-sm p-3 rounded text-justify bg-white"><h1 className="text-center">Metodo Render</h1><hr></hr>
      El término “render prop” se refiere a una técnica para compartir código entre componentes en React utilizando una propiedad cuyo valor es una función. Un componente con una render prop toma una función que devuelve un elemento de React y lo llama en lugar de implementar su propia lógica de representación.
      </div>
      <div className="border shadow-sm p-3 rounded text-justify bg-white"><h1 className="text-center">Metodo Strict Mode</h1><hr></hr>
      El modo estricto de ECMAScript 5 es una forma de elegir una variante restringida de JavaScript, así implícitamente se deja de lado el modo poco riguroso. El modo estricto no es sólo un subconjunto: intencionalmente tiene diferencia semántica del código normal. Los navegadores que no admiten el modo estricto ejecutarán el código con un comportamiento diferente a los que sí lo soportan, por lo tanto no confíes en el modo estricto sin antes hacer pruebas de sus características más relevantes. Los modos estricto y no estricto pueden coexistir, por lo tanto el código se puede transformar a modo estricto incrementalmente.
      </div>
      <div className="border shadow-sm p-3 rounded text-justify bg-white"><h1 className="text-center">Metodo Return</h1><hr></hr>
      La sentencia return se emplea para salir de la secuencia de ejecución de las sentencias de un método y, opcionalmente, devolver un valor. Tras la salida del método se vuelve a la secuencia de ejecución del programa al lugar de llamada de dicho método.
      </div>
      </div>
      <div className="text-center">
        <a href="https://github.com" target="_blank"><Button className="shadow" size="lg"><BsGithub /> A GitHub</Button></a>
      </div>
    </div>
  );
}
function Curriculum() {
  return(
    <div className="wrapper-center">
      <h1 className="text-center mb-4">Curriculum</h1>
      <iframe src={cv} width="500px" height="700px" className="d-block mx-auto shadow-sm"></iframe>
    </div>
  )
}

function Mockup(){
  return(
    <div className="wrapper-center">
      <h1 className="text-center mb-4">Mockup</h1>
      <img src={mockup} className="d-block mx-auto"></img>
    </div>
  )
}


function App() {

  const navigate = useNavigate()


  return (
    <div className="app bg-light">
      
{/*     <ul>
          <Link to={'/hernandeze'} className="btn">Inicio</Link>
          <Link to={'hernandeze/logo'} className="btn">Curriculum</Link>
          <Link to={'hernandeze/galeria'} className="btn">Galeria</Link>
          <Link to={'hernandeze/mapa'} className="btn">Mapa</Link>
          <Link to={'hernandeze/login'} className="btn">Login</Link>
        </ul> */}

      <Navbar bg="dark" variant="dark" className="py-3">
        <Container>
          <Navbar.Brand href="/hernandeze"><FaReact className="spinner "/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> navigate('/hernandeze/')}>Inicio</Nav.Link>
            <Nav.Link onClick={()=> navigate('/hernandeze/cv')}>Curriculum</Nav.Link>
            <Nav.Link onClick={()=> navigate('/hernandeze/mockup')}>Mockup</Nav.Link>
            <Nav.Link onClick={()=> navigate('/hernandeze/galeria')}>Galeria</Nav.Link>
            <Nav.Link onClick={()=> navigate('/hernandeze/mapa')}>Mapa</Nav.Link>
            <Nav.Link onClick={()=> navigate('/hernandeze/login')}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        

      
      <Routes>
        <Route path="/hernandeze">
          <Route index element={<Home />}/>
          <Route path="cv" element={<Curriculum />} />
          <Route path="galeria" element={<Carrusel />} />
          <Route path="mapa" element={<GoogleMap />} />
          <Route path="login" element={<Login/>} />
          <Route path="mockup" element={<Mockup/>} />
        </Route>
        {/* <Route path="/nombre" element={<Nombre />} />
        <Route path="/UTD" element={<UTD />} />
        <Route path="/logo" element={<Logo />} />
        <Route path="/carrera" element={<Carrera />} />
        <Route path="/foto" element={<Foto />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/galeria" element={<Carrusel />} />
        <Route path="/mapa" element={<GoogleMap />} /> */}
      </Routes>
    </div>
  );
}

export default App;
