"use client"

import { FaMagnifyingGlass } from "react-icons/fa6";

const HeaderEmpresa = () => {
  return (
    <>
        {/* Parte Superrior */}
      <section className="flex-col justify-center p-2 bg-red w-full">
        <h3 className="text-3xl font-bold text-center  mt-3">
          Empresas
        </h3>

        <section className="md:flex md:justify-between md:px-2 bg-red gap-3 ">
          <div className=" mt-5 col-span-4 flex items-center  justify-end gap-1 md:gap-3">
            <p className="font-new-font font-new-bold ">Nombre</p>
            <div className="w-full flex bg-gray-300 border border-black rounded-xl px-2 bg-red">
              <FaMagnifyingGlass className="mt-2 bg-red" />
              <input
                type="text"
                placeholder="Buscar"
                // onChange={handleFiltroCambio}
                className="w-full font-semibold rounded-xl py-1 bg-gray-300 px-1 outline-none"
              />
            </div>
          </div>

           

            <button
              className="mt-5 md:w-1/3 text-white font-new-font font-new-bold bg-green-600 rounded-lg py-3 px-2 w-full"
              // onClick={() => navigate("/inicio/centrosalud/agregarnuevo")}
            >
              Agregar Nuevo +
            </button>


         
        </section>
      </section>
     
    </>
  )
}
export default HeaderEmpresa
