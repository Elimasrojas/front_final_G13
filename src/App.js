import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Admin from './components/Admin';
import Categorias from './components/categorias/Categorias';
import CrearCategoria from './components/categorias/CrearCategoria';
import CrearCuenta from './components/CrearCuenta';
import CrearProductos from './components/productos/CrearProductos';
import Home from './components/Home';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Productos from './components/productos/Productos';
import ActulizarCategoria from './components/categorias/ActualizarCategoria';
import ActualizarProducto from './components/productos/ActualizarProducto';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/crear-cuenta" exact element={<CrearCuenta/>} />
          <Route path="/admin" exact element={<Admin/>} />
          <Route path="/categorias" exact element={<Categorias/>} />   
          <Route path="/productos" exact element={<Productos/>} />  
          <Route path="/actualizar-categoria/:idCategoria" exact element={<ActulizarCategoria/>} /> 
          <Route path="/crear-categorias" exact element={<CrearCategoria/>} />    
          <Route path="/crear-productos" exact element={<CrearProductos/>} />   
          <Route path="/actualizar-producto/:idProducto" exact element={<ActualizarProducto/>} /> 
          <Route path="*" exact element={<PageNotFound/>} />   
      </Routes>
    </Router>
  );
}

export default App;
