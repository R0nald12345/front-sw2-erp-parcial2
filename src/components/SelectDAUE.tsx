"use client"
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface SelectDAUEProps {
  facultades?: string[];
  carreras?: string[];
  className?: string;
}

const defaultFacultades = [
  "Facultad de Tecnología",
  "Facultad del Hábitat",
  "Facultad de Ingeniería",
  "Facultad de Ciencias Sociales",
];

const defaultCarreras = [
  "Carrera de Arte",
  "Carrera de Sistemas",
  "Carrera de Arquitectura",
  "Carrera de Electrónica",
  "Carrera de Derecho",
];

const SelectDAUE: React.FC<SelectDAUEProps> = ({
  facultades = defaultFacultades,
  carreras = defaultCarreras,
  className = "",
}) => {
  const [searchDA, setSearchDA] = useState<string>("");
  const [searchUE, setSearchUE] = useState<string>("");
  const [selectedDA, setSelectedDA] = useState<string>("");
  const [selectedUE, setSelectedUE] = useState<string>("");

  const [openDA, setOpenDA] = useState<boolean>(false);
  const [openUE, setOpenUE] = useState<boolean>(false);

  const wrapperDARef = useRef<HTMLDivElement | null>(null);
  const wrapperUERef = useRef<HTMLDivElement | null>(null);
  const inputDARef = useRef<HTMLInputElement | null>(null);
  const inputUERef = useRef<HTMLInputElement | null>(null);

  const filteredDA = facultades.filter((item) =>
    item.toLowerCase().includes(searchDA.toLowerCase())
  );
  const filteredUE = carreras.filter((item) =>
    item.toLowerCase().includes(searchUE.toLowerCase())
  );

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        openDA &&
        wrapperDARef.current &&
        !wrapperDARef.current.contains(e.target as Node)
      ) {
        setOpenDA(false);
      }
      if (
        openUE &&
        wrapperUERef.current &&
        !wrapperUERef.current.contains(e.target as Node)
      ) {
        setOpenUE(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDA(false);
        setOpenUE(false);
        inputDARef.current?.blur();
        inputUERef.current?.blur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDA, openUE]);

  const handleSelectDA = (item: string) => {
    setSelectedDA(item);
    setSearchDA(item);
    setOpenDA(false);
  };

  const handleSelectUE = (item: string) => {
    setSelectedUE(item);
    setSearchUE(item);
    setOpenUE(false);
  };

  const onDAInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchDA(e.target.value);
    if (!openDA) setOpenDA(true);
  };

  const onUEInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUE(e.target.value);
    if (!openUE) setOpenUE(true);
  };

  return (
    <div className={`max-w-md mx-auto mt-8 p-6 bg-white text-black rounded-2xl shadow-lg space-y-6 ${className}`}>
      <h2 className="text-2xl font-bold text-center">Selección de Facultad y Carrera</h2>

      {/* DA (Facultad) */}
      <div ref={wrapperDARef} className="relative">
        <label className="block text-sm font-semibold mb-2">DA (Facultad)</label>
        <div
          className="w-full"
          onClick={() => {
            setOpenDA(true);
            inputDARef.current?.focus();
          }}
        >
          <input
            ref={inputDARef}
            type="text"
            placeholder="Buscar facultad..."
            value={searchDA}
            onChange={onDAInputChange}
            onFocus={() => setOpenDA(true)}
            aria-expanded={openDA}
            aria-haspopup="listbox"
            className="w-full p-2 rounded-md bg-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown */}
        {openDA && (
          <ul
            role="listbox"
            aria-label="Facultades"
            className="absolute z-30 left-0 right-0 mt-2 max-h-44 overflow-y-auto bg-white rounded-md border border-gray-700 shadow-lg"
          >
            {filteredDA.length > 0 ? (
              filteredDA.map((item) => (
                <li
                  key={item}
                  role="option"
                  aria-selected={selectedDA === item}
                  tabIndex={0}
                  className={`p-2 cursor-pointer hover:bg-blue-600 rounded`}
                  onClick={() => handleSelectDA(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSelectDA(item);
                  }}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No se encontró</li>
            )}
          </ul>
        )}
      </div>

      {/* UE (Carrera) */}
      <div ref={wrapperUERef} className="relative">
        <label className="block text-sm font-semibold mb-2">UE (Carrera)</label>
        <div
          className="w-full"
          onClick={() => {
            setOpenUE(true);
            inputUERef.current?.focus();
          }}
        >
          <input
            ref={inputUERef}
            type="text"
            placeholder="Buscar carrera..."
            value={searchUE}
            onChange={onUEInputChange}
            onFocus={() => setOpenUE(true)}
            aria-expanded={openUE}
            aria-haspopup="listbox"
            className="w-full p-2 rounded-md bg-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown */}
        {openUE && (
          <ul
            role="listbox"
            aria-label="Carreras"
            className="absolute z-30 left-0 right-0 mt-2 max-h-44 overflow-y-auto bg-white rounded-md border border-gray-700 shadow-lg"
          >
            {filteredUE.length > 0 ? (
              filteredUE.map((item) => (
                <li
                  key={item}
                  role="option"
                  aria-selected={selectedUE === item}
                  tabIndex={0}
                  className={`p-2 cursor-pointer hover:bg-blue-600 rounded }`}
                  onClick={() => handleSelectUE(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSelectUE(item);
                  }}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No se encontró</li>
            )}
          </ul>
        )}
      </div>

      {/* Resultados */}
      <div className="pt-4 border-t border-gray-700 text-sm">
        <p><span className="font-semibold">Facultad:</span> {selectedDA || "—"}</p>
        <p><span className="font-semibold">Carrera:</span> {selectedUE || "—"}</p>
      </div>
      {/* Botones */}
      <div className="pt-4 border-t border-gray-700 text-sm flex justify-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
          Ingreso
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition">
          Salir
        </button>
      </div>


    </div>
  );
};

export default SelectDAUE;
