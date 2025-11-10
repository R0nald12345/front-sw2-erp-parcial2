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
    <ul className='w-full flex gap-1 rounded-xl mb-3 card-modern hover:shadow-large transition-all duration-200 overflow-hidden'>
      <li className="w-[28%] font-semibold text-start px-4 py-4 truncate text-gray-900">
        {empresa.nombre}
      </li>
      <li className="w-[30%] font-semibold text-start px-4 py-4 flex items-center truncate text-gray-700">
        {empresa.correo}
      </li>
      <li className="w-[15%] font-semibold px-4 py-4 flex items-center justify-center text-gray-700">
        {empresa.rubro}
      </li>
      <li className="w-[12%] font-semibold px-4 py-4 flex items-center justify-center">
        <span className="badge-primary text-xs">
          {empresa.ofertas?.length || 0}
        </span>
      </li>
      <li className='w-[15%] flex items-center justify-end pr-4'>
        <div className='flex justify-between gap-2 cursor-pointer'>
          <button
            onClick={handleViewClick}
            className="btn-outline-small text-gray-600 hover:text-gray-900"
            title="Ver detalles"
          >
            <IoEyeSharp className="text-lg" />
          </button>
          <button
            onClick={handleEditClick}
            className="btn-outline-small text-blue-600 hover:text-blue-700"
            title="Editar"
          >
            <BiEditAlt className="text-lg" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="btn-outline-small text-red-600 hover:text-red-700"
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