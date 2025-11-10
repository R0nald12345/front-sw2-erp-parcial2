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
      <section className="card-modern mx-4 md:mx-6 mb-6 p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            📋 Gestión de Empresas
          </h3>
          <p className="text-gray-600 text-sm md:text-base">Administra y controla todas tus empresas en un solo lugar</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar por nombre, correo o rubro..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="input-modern w-full pl-12"
              />
              <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAgregarClick}
            className="btn-success flex items-center justify-center gap-2 whitespace-nowrap md:w-auto"
          >
            <FaPlus size={18} />
            <span>Agregar Nuevo</span>
          </button>
        </div>
      </section>
    </>
  )
}

export default HeaderEmpresa