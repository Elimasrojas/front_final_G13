import React, { useEffect, useState }  from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../conexiones/crud";
import {  useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActulizarCategoria = () => {
  const navigate = useNavigate();

  const { idCategoria } = useParams();
  console.log(idCategoria);

  const [categoria, setCategoria] = useState({
    nombre: "",
    imagen: "",
  });
  const cargarCategoria = async () => {
    const response = await crud.GET(`/api/categoria/${idCategoria}`);
    // console.log(response);
    setCategoria(response.categoria);
  };
  useEffect(() => {
    cargarCategoria();
  }, []);

  let { nombre, imagen } = categoria;

  const onChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarCategoria = async () => {
    const data = {
      nombre: categoria.nombre,
      imagen: categoria.imagen,
    };
    //console.log(data, idCategoria);
    const response = await crud.PUT(`/api/categoria/${idCategoria}`, data);
    console.log(response);
    const mensaje1 = "la categoria se actualizo correctamente";
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
    navigate("/categorias");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    actualizarCategoria();
  };

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="container mx-auto mt-2 md:mt-2  md:flex md:justify-center">
          <div className="md:w-2/3 lg:w-2/5">
            <div className="flex-1 flex-col text-center">
              <h1
                className="inline bg-gradient-to-r from-yellow-500 via-yellow-700 to-gray-700 
            bg-clip-text font-display text-5xl tracking-tight text-transparent py-3"
              >
                Actualizar Categoria
              </h1>
            </div>

            <div>
              <form
                className="my-5 bg-white shadow rounded-lg p-10 "
                onSubmit={onSubmit}
              >
                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-lg font-bold">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre de la categoria"
                    className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    value={nombre}
                    onChange={onChange}
                  />
                </div>
                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-lg font-bold">
                    Imagen:
                  </label>
                  <input
                    type="text"
                    id="imagen"
                    name="imagen"
                    placeholder="Imagen de la categoria"
                    className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                      bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    value={imagen}
                    onChange={onChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Actualizar Categoria"
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

export default ActulizarCategoria;
