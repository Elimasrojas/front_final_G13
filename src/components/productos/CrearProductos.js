import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../conexiones/crud";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const CrearProductos = () => {
  const navigate = useNavigate();
  const [categoria, setCategorias] = useState([]);
  const [select, setSelect] = useState('');

  //const { idCategoria } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    stock: "",
    precio: "",
    imagen: "",
    categoriaId: "",
  });

  const { nombre, descripcion, stock, precio, imagen } = producto;
  console.log("prop",producto)
  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,

    });
  };

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categoria`);
    console.log("response:",response);
    setCategorias(response.categoria);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const crearProducto = async () => {
    console.log("data0: ")
    const data = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      stock: producto.stock,
      precio: producto.precio,
      imagen: producto.imagen,
      categoriaId: select,
    };
    console.log("data1: ",data)

    const response = await crud.POST(`/api/producto`, data);
    const mensaje = response.msg;
    console.log(mensaje);
    const mensaje1 = "El producto fue creado correctamente";
    swal({
      title: "Información",
      text: mensaje1,
      icon: "success",
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-primary",
          closeModal: true,
        },
      },
    });
    navigate(`/productos`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearProducto();
  };

  const updateCat =(idCat)=>{
    setSelect(idCat);
    console.log(idCat);
    alert(select);
  }

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="container mx-auto mt-2 md:mt-2  md:flex md:justify-center">
          <div className="md:w-1/3 lg:w-4/5">
            <div className="flex-1 flex-col text-center">
              <h1
                className="inline bg-gradient-to-r from-yellow-500 via-yellow-700 to-gray-700 
                  bg-clip-text font-display text-5xl tracking-tight text-transparent py-3"
              >
                Crear Producto
              </h1>
            </div>

            <div>
              <form
                className="my-1 bg-white shadow rounded-lg p-5 "
                onSubmit={onSubmit}
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                      value={nombre}
                      onChange={onChange}
                      placeholder="Nombre del Producto"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                      Descripcion:
                    </label>
                    <input
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                      onChange={onChange}
                      className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500
                       focus:ring-sky-500 focus:ring-1"
                      placeholder="Descripcion del Producto"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-1">
                  <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                      Stock:
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={stock}
                      onChange={onChange}
                      className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500
                       focus:ring-sky-500 focus:ring-1"
                      placeholder="Stock"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                      precio:
                    </label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={precio}
                      onChange={onChange}
                      className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500
                       focus:ring-sky-500 focus:ring-1"
                      placeholder="precio"
                    />
                  </div>
                </div>

                <div className="my-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Imagen:
                  </label>
                  <input
                    type="text"
                    id="imagen"
                    name="imagen"
                    value={imagen}
                    placeholder="Nombre de la categoria"
                    className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500
                       focus:ring-sky-500 focus:ring-1"
                    onChange={onChange}
                  />
                </div>
                <div className="my-5">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Categoria:
                  </label>
                  <div className="inline-block relative w-64">
                    <select 
                      id="categoriaId"
                      name="categoriaId" 
                                 
                      onChange={(e)=>updateCat(e.target.value)}                
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {categoria.map((categor) => (
                        <option value={categor._id} key={categor._id}>
                          {categor.nombre}                         
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Crear Categoria"
                  className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-semibold  text-sm  border rounded-lg 
                    hover:cursor-pointer hover:bg-red-500 transition-colors"
                />
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CrearProductos;
