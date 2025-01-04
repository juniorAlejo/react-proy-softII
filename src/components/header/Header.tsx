import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./NavBar";
import Logo from "../../assets/img/logo_header.png";

export const Header: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  //---------------------------------------------------------------- SCROLL
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${
          isActive ? "bg-[#EAF1F7] py-4 shadow-md" : "bg-[#F8F8F8] py-6"
        } fixed w-full z-10 transition-all border-b border-gray-200`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link to={"/"}>
            <div className="flex items-center gap-4">
              <img className="w-[165px]" src={Logo} alt="Logo" />
            </div>
          </Link>

          <div className="flex gap-8">
            <div className="absolute right-0 left-0 h-full -bottom-[70px] flex justify-center sm:bg-none sm:relative sm:right-0 sm:bottom-0">
              <Navbar />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
