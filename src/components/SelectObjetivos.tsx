"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";

interface ObjetivoEstrategico {
  id: string;
  nombre: string;
}

interface ObjetivoGestion {
  id: string;
  nombre: string;
}

interface SelectObjetivosProps {
  objetivosEstrategicos?: ObjetivoEstrategico[];
  objetivosGestion?: ObjetivoGestion[];
}

const SelectObjetivos: React.FC<SelectObjetivosProps> = ({
  objetivosEstrategicos = [
    { id: "102.100", nombre: "Desarrollar capacidades tecnológicas" },
    { id: "103.200", nombre: "Fortalecer la investigación aplicada" },
  ],
  objetivosGestion = [
    { id: "102.100.01", nombre: "Implementar laboratorios de innovación" },
    { id: "102.100.02", nombre: "Mejorar la infraestructura de aulas" },
    { id: "103.200.01", nombre: "Impulsar proyectos de investigación" },
  ],
}) => {
  const [searchGestion, setSearchGestion] = useState("");
  const [selectedGestion, setSelectedGestion] = useState<ObjetivoGestion | null>(null);
  const [selectedEstrategico, setSelectedEstrategico] = useState<ObjetivoEstrategico | null>(null);
  const [openGestion, setOpenGestion] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Filtra por id o nombre
  const filteredGestion = objetivosGestion.filter(
    (obj) =>
      obj.nombre.toLowerCase().includes(searchGestion.toLowerCase()) ||
      obj.id.toLowerCase().includes(searchGestion.toLowerCase())
  );

  // Vincular objetivo estratégico automáticamente
  useEffect(() => {
    if (selectedGestion) {
      const prefix = selectedGestion.id.split(".").slice(0, 2).join(".");
      const estrategico = objetivosEstrategicos.find((o) => o.id === prefix);
      setSelectedEstrategico(estrategico || null);
    }
  }, [selectedGestion, objetivosEstrategicos]);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenGestion(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white text-black rounded-2xl shadow-xl space-y-8">
      <h2 className="text-2xl font-bold text-center">PROGRAMA OPERATIVO ANUAL</h2>

      {/* Objetivo de Gestión */}
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-semibold mb-2 text-gray-800">
          Objetivo de Gestión (ACP)
        </label>

        <input
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={searchGestion}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchGestion(e.target.value)}
          onFocus={() => setOpenGestion(true)}
          className="w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {openGestion && (
          <ul className="absolute z-30 left-0 right-0 mt-2 max-h-52 overflow-y-auto bg-white rounded-md border border-gray-300 shadow-lg">
            {filteredGestion.length > 0 ? (
              filteredGestion.map((item) => (
                <li
                  key={item.id}
                  className={`p-2 cursor-pointer hover:bg-green-100 rounded ${
                    selectedGestion?.id === item.id ? "bg-green-200" : ""
                  }`}
                  onClick={() => {
                    setSelectedGestion(item);
                    setSearchGestion(item.nombre);
                    setOpenGestion(false);
                  }}
                >
                  <span className="font-mono text-sm text-gray-700">{item.id}</span> —{" "}
                  {item.nombre}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-600">No se encontró resultado</li>
            )}
          </ul>
        )}
      </div>

      {/* Objetivo Estratégico */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-800">
          Objetivo Estratégico (automático)
        </label>
        <input
          type="text"
          value={
            selectedEstrategico
              ? `${selectedEstrategico.id} — ${selectedEstrategico.nombre}`
              : ""
          }
          readOnly
          placeholder="Se llenará automáticamente al seleccionar un objetivo de gestión"
          className="w-full p-2.5 rounded-md border border-gray-300 bg-gray-100 text-gray-800 cursor-not-allowed"
        />
      </div>

      {/* Resultados visibles */}
      <div className="pt-4 border-t border-gray-300 text-sm space-y-1">
        <p>
          <span className="font-semibold">Gestión:</span>{" "}
          {selectedGestion ? `${selectedGestion.id} — ${selectedGestion.nombre}` : "—"}
        </p>
        <p>
          <span className="font-semibold">Estratégico:</span>{" "}
          {selectedEstrategico ? `${selectedEstrategico.id} — ${selectedEstrategico.nombre}` : "—"}
        </p>
      </div>
      <div className="pt-4 border-t border-gray-700 text-sm flex justify-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
          Registrar
        </button>
      </div>

    </div>
  );
};

export default SelectObjetivos;
