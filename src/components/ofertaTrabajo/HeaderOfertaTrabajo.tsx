"use client"

import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { useState } from "react";

const HeaderOfertaTrabajo = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <section className="card-modern mx-4 md:mx-6 mb-6 p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            💼 Gestión de Ofertas de Trabajo
          </h3>
          <p className="text-gray-600 text-sm md:text-base">Crea y gestiona todas tus ofertas laborales</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar por título, empresa o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern w-full pl-12"
              />
              <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Add Button */}
          <button className="btn-success flex items-center justify-center gap-2 whitespace-nowrap md:w-auto">
            <FaPlus size={18} />
            <span>Crear Oferta</span>
          </button>
        </div>
      </section>
    </>
  )
}
export default HeaderOfertaTrabajo
