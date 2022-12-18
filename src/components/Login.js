import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import crud from "../conexiones/crud";
import swal from "sweetalert";
import Header from "./Header";


const Login = () => {
  const navigate = useNavigate();
  //const [error, setError] = useState(null);
  // const fontStyles = { color: "black", fontSize: "25px" };

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const autenticarUsuario = async () => {
    const data = {
      email: usuario.email,
      password: usuario.password,
    };

      const response = await crud.POST(`/api/auth`, data);
      const mensaje = response.msg;
      console.log(mensaje)
    
    if (mensaje === "el usuario no existe") {
      const mensaje = "el usuario no existe";
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
    } else if (mensaje === "el pass es invalido") {
      const mensaje = "password incorrecto";
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
      const jwt = response.token;
      localStorage.setItem("token", jwt);
      //redireccionar a la pantalla de admistrador
      navigate("/admin");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    autenticarUsuario();
  };

  return (
    <>
      <Header></Header>
      <main className="container mx-auto mt-2 md:mt-2  md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          <div className="flex-1 flex-col text-center">
            <h1
              className="inline bg-gradient-to-r from-yellow-500 via-yellow-700 to-gray-700 
            bg-clip-text font-display text-5xl tracking-tight text-transparent"
            >
              Iniciar sesión
            </h1>
          </div>

          <form
            className="my-2 bg-white shadow rounded-lg p-10 "
            onSubmit={onSubmit}
          >
            <div className="my-2">
              <label className="uppercase text-gray-600 block text-lg font-bold">
                <span>Email</span>
              </label>
              <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 -2.937 21 21"
                    data-name="15 - Email"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      data-name="Path 243"
                      d="M20.893 1.535a2.098 2.098 0 0 0 -2.098 -2.098H1.991A2.098 2.098 0 0 0 -0.107 1.535v10.925a2.098 
              2.098 0 0 0 2.098 2.098H18.795a2.098 2.098 0 0 0 2.098 -2.098V1.535Zm-1.399 0v10.925a0.699 0.699 0 0 1 -0.699 0.699H1.991a0.699 
              0.699 0 0 1 -0.699 -0.699V1.535a0.699 0.699 0 0 1 0.699 -0.699H18.795a0.699 0.699 0 0 1 0.699 0.699Z"
                      fillRule="evenodd"
                    />
                    <path
                      data-name="Path 244"
                      d="m1.233 1.728 8.82 4.901a0.704 0.704 0 0 0 0.68 0L19.554 1.728a0.699 0.699 0 1 0 -0.679 -1.222L10.393 
              5.218 1.912 0.506a0.699 0.699 0 1 0 -0.679 1.222Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email de Registro"
                  className="placeholder:italic placeholder:text-slate-400 w-full mt-2 pl-10 p-2 border rounded-lg bg-gray-50
                     border-gray-200  
                   leading-tight focus:outline-none  focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <label className="uppercase text-gray-600 block text-lg font-bold">
                password
              </label>
              <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-2">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h20v20H0z" />
                      <path d="M15 6.667h1.667a0.833 0.833 0 0 1 0.833 0.833v10a0.833 0.833 0 0 1 -0.833 0.833H3.333a0.833 0.833 0 0 1 -0.833 -0.833V7.5a0.833 0.833 0 0 1 0.833 -0.833h1.667V5.833a5 5 0 1 1 10 0v0.833zM4.167 8.333v8.333h11.667V8.333H4.167zm5 3.333h1.667v1.667h-1.667v-1.667zm-3.333 0h1.667v1.667H5.833v-1.667zm6.667 0h1.667v1.667h-1.667v-1.667zm0.833 -5V5.833a3.333 3.333 0 1 0 -6.667 0v0.833h6.667z" />
                    </g>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password de Registro"
                  className="placeholder:italic placeholder:text-slate-400 w-full mt-2 pl-10 p-2 border rounded-lg bg-gray-50   
                       border-gray-200   leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  // className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-yellow-500 mb-5 w-full py-3 text-black uppercase font-bold border rounded-lg 
              hover:cursor-pointer hover:bg-red-500 transition-colors"
            />
            <div className="flex justify-around">
              <Link
                to={"/crear-cuenta"}
                className=" bg-transparent  border text-center my-5 text-gray-800 font-semibold uppercase text-sm 
               hover:text-yellow-600  mt-2 p-2 hover:outline-1 hover:border-gray-500 rounded"
              >
                Crear Cuenta
              </Link>
              <Link
                to={"/"}
                className="bg-transparent  border text-center my-5 text-gray-800 font-semibold uppercase text-sm 
               hover:text-yellow-600  mt-2 p-2 hover:outline-1 hover:border-gray-500 rounded"
              >
                Regresar
              </Link>
            </div>
          </form>
        </div>
      </main>
     
    </>
  );
};

export default Login;
