import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";
import Header from "./Header";
import { FaUserCircle } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdPassword } from "react-icons/md";


const CrearCuenta = () => {
  const fontStyles = { color: "rgb(247,65,57)", fontSize: "20px" };
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const crearCuenta = async () => {
    //los dos password deben ser iguales
    if (password !== confirmar) {
      console.log("son diferentes");
      const mensaje = "Las contraseñas son diferentes.";
      swal({
        title: "Error",
        text: mensaje,
        icon: "error",
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else {
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
      };
      console.log(data);
      const response = await crud.POST(`/api/usuarios`, data);
      const mensaje = response.msg;
      if (mensaje === " el usuario ya existe") {
        const mensaje = "el usuario ya existe";
        swal({
          title: "Error",
          text: mensaje,
          icon: "error",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
          },
        });
      } else {
        const mensaje = "El usuario fue creado correctamente";
        swal({
          title: "Información",
          text: mensaje,
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

        setUsuario({
          nombre: "",
          email: "",
          password: "",
          confirmar: "",
        });
        //redireccionar a la pantalla de login
        navigate("/login");
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  };

  return (
    <>
      <Header />
      <main className="container mx-auto mt-2 md:mt-2 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          <div className="flex-1 flex-col text-center">
            <h1
              className="inline bg-gradient-to-r from-yellow-500 via-yellow-700 to-gray-700 
            bg-clip-text font-display text-5xl tracking-tight text-transparent"
            >
              Registrar de Usuario
            </h1>
          </div>

          <form
            onSubmit={onSubmit}
            className="my-5 bg-white shadow rounded-lg p-10"
          >
            <div>
              <div className="relative">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Nombre
                </label>
                <input
                  type="nombre"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese su nombre"
                  className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg
                     pl-10 bg-gray-50 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  value={nombre}
                  onChange={onChange}
                />
                <i className="absolute inset-y-0 left-0 flex items-center pl-2 pt-9">
                  <FaUserCircle style={fontStyles} />
                </i>
              </div>
              <div className="relative">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email de Registro"
                  className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg bg-gray-50   
                      pl-10 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  value={email}
                  onChange={onChange}
                />
                <i className="absolute inset-y-0 left-0 flex items-center pl-2 pt-9">
                  <CiMail style={fontStyles} />
                </i>
              </div>
              <div className="relative">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password de Registro"
                  className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg bg-gray-50   
                      pl-10 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  value={password}
                  onChange={onChange}
                />
                <i className="absolute inset-y-0 left-0 flex items-center pl-2 pt-9">
                  <MdPassword style={fontStyles} />
                </i>
              </div>
              <div className="relative">
                <label className="uppercase text-gray-600 block text-lg font-bold">
                  confirmación{" "}
                </label>
                <input
                  type="password"
                  id="confirmar"
                  name="confirmar"
                  placeholder="Confirme su Password"
                  className="placeholder:italic placeholder:text-slate-400 w-full mt-2 p-2 border rounded-lg bg-gray-50   
                      pl-10 border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  value={confirmar}
                  onChange={onChange}
                />
                <i className="absolute inset-y-0 left-0 flex items-center pl-2 pt-9">
                  <MdPassword style={fontStyles} />
                </i>
              </div>
            </div>

            <input
              type="submit"
              value="Crear Cuenta"
              className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-bold border rounded-lg 
              hover:cursor-pointer hover:bg-red-500 transition-colors"
            />
            <Link
              to={"/"}
              className=" bg-transparent  border text-center my-5 text-gray-800 font-semibold uppercase text-sm 
               hover:text-yellow-600  mt-2 p-2 hover:outline-1 hover:border-gray-500 rounded"
            >
              Regresar
            </Link>
          </form>
        </div>
      </main>
    </>
  );
};

export default CrearCuenta;
