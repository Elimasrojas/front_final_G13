import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../conexiones/crud";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import swal from "sweetalert";

const Productos = () => {
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

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const response = await crud.GET(`/api/producto`); //TODO
    //console.log(response);
    setProductos(response);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const borrarProducto = async (idCategoria) => {
    swal({
      title: "Estas seguro de eliminar el producto?",
      text: "una vez eliminado, no se podra recuperar este Producto",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        
        const response = crud.DELETE(`/api/producto/${idCategoria}`);
        console.log(response);
        cargarProductos();
        if (response) {
          swal("Tu Producto a sido eliminado correctamente", {
            icon: "success",
          });
        }
        

      } else {
        swal("se cancelo la Eliminacion del Producto");
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
              bg-clip-text font-display text-5xl tracking-tight text-transparent py-2"
            >
              Listado de Productos
            </h1>
          </div>
          <div className="w-3/4 container mx-auto flex justify-end">
            <Link
              to={"/crear-productos"}
              className=" bg-green-600   border text-center  text-white font-semibold uppercase text-sm 
                mt-2 p-2 hover:outline-1 hover:border-gray-500 rounded"
            >
              Nuevo Producto
            </Link>
          </div>
          <div className="container mx-auto mt-1 md:mt-15  md:flex md:justify-center">
            <table className="w-3/4 text-sm text-left text-gray-500 dark:text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-400 dark:text-gray-800">
                <tr>
                  <th 
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "10%" }}>
                    Imagen
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "20%" }}
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "30%" }}
                  >
                    Descripcion
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "10%" }}
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "10%" }}
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "10%" }}
                  >
                    CategoriaId
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6"
                    style={{ width: "10%" }}
                  >
                    Opciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {productos.map((prod) => (
                  <tr
                    className="bg-slate-200 border-b dark:bg-white dark:border-gray-700"
                    key={prod._id}
                  >
                    <td className="py-2 px-6">
                      <img src={prod.imagen} alt=""></img>
                    </td>
                    <td className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      {prod.nombre}
                    </td>
                    <td className="py-2 px-6">{prod.descripcion}</td>
                    <td className="py-2 px-6">{prod.stock}</td>
                    <td className="py-2 px-6">{prod.precio}</td>
                    <td className="py-2 px-6">{prod.categoriaId}</td>                    
                    <td className="py-2 px-6">
                      <div className="flex float-left">
                        <Link to={`/actualizar-producto/${prod._id}`}>
                          <MdModeEdit
                            style={{
                              color: "rgb(48,169,83)",
                              fontSize: "20px",
                            }}
                          />
                        </Link>
                        <button onClick={() => borrarProducto(prod._id)}>
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



export default Productos;
