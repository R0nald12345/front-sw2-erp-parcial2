"use client"

import { useState } from "react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";

interface HeaderEmpresaProps {
  onSearch?: (term: string) => void;
  onAgregarNuevo?: () => void;
}

const HeaderEmpresa = ({ onSearch, onAgregarNuevo }: HeaderEmpresaProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleAgregarClick = () => {
    console.log('➕ Agregar nueva empresa');
    if (onAgregarNuevo) {
      onAgregarNuevo();
    }
  };

  return (
    <>
      <section className="flex-col justify-center p-2 bg-gray-50 w-full rounded-t-xl">
        <h3 className="text-3xl font-bold text-center mt-3">
          📋 Gestión de Empresas
        </h3>

        <section className="md:flex md:justify-between md:px-2 gap-3 mt-5">
          <div className="col-span-4 flex items-center justify-end gap-1 md:gap-3 md:flex-1">
            <p className="font-semibold text-gray-700 hidden sm:block">Buscar:</p>
            <div className="w-full flex bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-shadow">
              <FaMagnifyingGlass className="text-gray-500 mt-1" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo o rubro..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full font-medium rounded-lg py-1 bg-white px-3 outline-none text-gray-700"
              />
            </div>
          </div>

          <button
            onClick={handleAgregarClick}
            className="mt-5 md:mt-0 md:w-auto text-white font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg py-2 px-6 w-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <FaPlus size={16} />
            Agregar Nuevo
          </button>
        </section>
      </section>
    </>
  )
}

export default HeaderEmpresa