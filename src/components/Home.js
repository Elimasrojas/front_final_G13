import React, { useEffect, useState } from "react";
import Header from "./Header";
//import { useNavigate } from "react-router-dom";
import crud from "../conexiones/crud";

const Home = () => {
  //const navigate = useNavigate();
  const [categoria, setCategorias] = useState([]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categoria/home`);
    console.log("uno");
    console.log(response);
    setCategorias(response.categoria);
  };

  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {categoria.map((item) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={item._id}>
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={item.imagen}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORIA
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.nombre}
                  </h2>
                  <p className="mt-1">{item._id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
