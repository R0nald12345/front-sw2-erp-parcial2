"use client"

import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { EmpresaType } from "@/src/types/erp/empresa.types";

interface ListadoEmpresaProps {
  empresa: EmpresaType;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (empresa: EmpresaType) => void;
  onView?: (empresa: EmpresaType) => void;
}

const ListadoEmpresa = ({ empresa, onDelete, onEdit, onView }: ListadoEmpresaProps) => {
  const handleDeleteClick = async () => {
    if (onDelete) {
      try {
        console.log('🗑️ Eliminar empresa:', empresa.id);
        await onDelete(empresa.id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const handleEditClick = () => {
    if (onEdit) {
      console.log('✏️ Editar empresa:', empresa.id);
      onEdit(empresa);
    }
  };

  const handleViewClick = () => {
    if (onView) {
      console.log('👁️ Ver empresa:', empresa.id);
      onView(empresa);
    }
  };

  return (
    <ul className='w-full flex gap-1 rounded-xl mb-3 bg-white shadow-md hover:shadow-lg transition-all duration-200'>
      <li className="w-[28%] font-semibold text-start px-3 py-3 truncate">
        {empresa.nombre}
      </li>
      <li className="w-[30%] font-semibold text-start px-3 py-3 flex items-center truncate">
        {empresa.correo}
      </li>
      <li className="w-[15%] font-semibold px-3 py-3 flex items-center justify-center">
        {empresa.rubro}
      </li>
      <li className="w-[12%] font-semibold px-3 py-3 flex items-center justify-center">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
          {empresa.ofertas?.length || 0}
        </span>
      </li>
      <li className='w-[15%] flex items-center justify-end pr-2'>
        <div className='flex justify-between gap-2 cursor-pointer'>
          <button
            onClick={handleViewClick}
            className="p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition tooltip"
            title="Ver detalles"
          >
            <IoEyeSharp className="text-lg" />
          </button>
          <button
            onClick={handleEditClick}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition tooltip"
            title="Editar"
          >
            <BiEditAlt className="text-lg" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition tooltip"
            title="Eliminar"
          >
            <RiDeleteBin5Line className="text-lg" />
          </button>
        </div>
      </li>
    </ul>
  )
}

export default ListadoEmpresa