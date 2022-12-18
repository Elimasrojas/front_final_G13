import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Header = () => {

  const navigate = useNavigate();
  const fontStyles = { color: "rgb(247,65,57)", fontSize: "30px" };
  const fontStyles2 = { color: "rgb(48,169,83)", fontSize: "30px" };

  const cerrarSesion = () => {    
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="px-4 py-5 bg-yellow-300 border">
      <div className="md:flex md:justify-between">

        <h2 className="text-4xl text-black-500 font-bold text-center mb-5 md:mb-0">
          Exito G13.
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">          
          { !localStorage.getItem("token") ?
          <Link to={"/login"}>
            <FaUserCircle style={fontStyles} />
          </Link>:
          <Link to={"/admin"} >
            <FaUserCircle style={fontStyles2} />
          </Link>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
