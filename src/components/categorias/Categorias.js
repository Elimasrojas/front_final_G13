import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../conexiones/crud";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import swal from "sweetalert";

const Categorias = () => {
  const fontStyles = { color: "rgb(247,65,57)", fontSize: "20px" };
  //const fontStylesNew = { color: "rgb(48,169,83)", fontSize: "30px" };
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      //console.log(token)
      if (!token) {
        navigate("/login");
      }
    };
    autenticarUsuario();
  }, [navigate]); // [] hacen que solo se ejecute una vez el useEffect

  const [categoria, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categoria`);
    //console.log(response);
    setCategorias(response.categoria);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const borrarCategoria = async (idCategoria) => {
    swal({
      title: "Estas seguro de eliminar la categoria?",
      text: "una vez eliminado, no se podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);
        console.log(response);
        cargarCategorias();
        if (response) {
          swal("Tu categoria a sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();

      } else {
        swal("se cancelo la acción");
      }
    });
  };

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="w-3/4 flex-1 justify-center ">
          <div className="container mx-auto mt-2 md:mt-2  md:flex md:justify-center">
            <h1
              className="inline bg-gradient-to-r from-yellow-500 via-yellow-700 to-gray-700 
              bg-clip-text font-display text-5xl tracking-tight text-transparent py-5"
            >
              Listado de categorias
            </h1>
          </div>
          <div className="w-3/4 container mx-auto flex justify-end">
            <Link
              to={"/crear-categorias"}
              className=" bg-green-600   border text-center  text-white font-semibold uppercase text-sm 
               p-2 hover:outline-1 hover:border-gray-500 rounded"
            >
              Nueva Categoria
            </Link>
          </div>
          <div className="container mx-auto mt-1 md:mt-15  md:flex md:justify-center">
            <table className="w-3/4 text-sm text-left text-gray-500 dark:text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-400 dark:text-gray-800">
                <tr>
                  <th style={{ width: "10%" }}>Imagen</th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "15%" }}
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "45%" }}
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "30%" }}
                  >
                    Opciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {categoria.map((item) => (
                  <tr
                    className="bg-slate-200 border-b dark:bg-white dark:border-gray-700"
                    key={item._id}
                  >
                    <td className="py-2 px-6">
                      <img src={item.imagen} alt=""></img>
                    </td>
                    <td className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      {item._id}
                    </td>
                    <td className="py-2 px-6">{item.nombre}</td>
                    <td className="py-2 px-6">
                      <div className="flex float-left">
                        <Link to={`/actualizar-categoria/${item._id}`}>
                          <MdModeEdit
                            style={{
                              color: "rgb(48,169,83)",
                              fontSize: "20px",
                            }}
                          />
                        </Link>
                        <button onClick={() => borrarCategoria(item._id)}>
                          <MdDelete style={fontStyles} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Categorias;
