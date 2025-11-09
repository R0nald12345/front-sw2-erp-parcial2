"use client"

import "../../../globals.css";

import ListadoEmpresa from "./ListadoEmpresa";


const ListadoGeneralEmpresa = () => {
  // const navigate = useNavigate();

  // const [datosCentroSalud, setDatosCentroSalud] = useState([]);
  // const [filtro, setFiltro] = useState("");

  // useEffect(() => {
  //   const fetchingDatosCentroSalud = async () => {
  //     try {
  //       const response = await getDatoCentroSalud();
  //       setDatosCentroSalud(response);
  //     } catch (error) {
  //       console.log(
  //         "Error en Componente ListaGeneral fetchingDatosCentrosDeportivos",
  //         error
  //       );
  //     }
  //   };
  //   fetchingDatosCentroSalud();
  // }, []);

  // const handleDeleteCentroSalud = async (id) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Deseas Eliminar?",
  //       text: "Si eliminas no podrás recuperarlo!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Si, quiero Eliminar!",
  //     });

  //     if (result.isConfirmed) {
  //       const response = await deleteDatoCentroSalud(id);

  //       setDatosCentroSalud((prevState) =>
  //         prevState.filter((element) => element.id !== id)
  //       );

  //       Swal.fire({
  //         title: "Eliminado!",
  //         text: "Eliminado Correctamente.",
  //         icon: "success",
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Error en el Componente Lista_CentroTuristicos", error);
  //   }
  // };

  
  // const handleDireccionEspecialidad = (e) => {
  //   e.preventDefault();
  //   navigate(`/inicio/centrosalud/especialidades/${id}`);
  // }

  // const handleFiltroCambio = (e) => {
  //   setFiltro(e.target.value);
  // };

  // const listaFiltrada =
  //   filtro.trim() === ""
  //     ? datosCentroSalud
  //     : datosCentroSalud.filter((element) =>
  //         element.nombre.toLowerCase().includes(filtro.toLowerCase())
  //       );

  return (
    <>
    

      {/* Lista de Centros Deportivos */}
      <main className="w-full mt-5">
        {/* Lista para pantallas grandes */}
        <div className="hidden md:flex flex-col justify-center w-full">
          <ul className="w-full flex bg-white gap-1 mb-3 rounded-xl shadow-lg">
            <li className="font-semibold text-start w-[32%] px-3 py-2">
              Nombre
            </li>

            <li className="font-semibold text-start w-[33%] px-3 py-2">
              Direccion
            </li>

            <li className="font-semibold text-center w-[12%] px-3 py-2">
              Horario
            </li>

            <li className="font-semibold text-center w-[8%] px-3 py-2">
              Nivel
            </li>

            <li className="font-semibold text-center w-[15%] px-3 py-2">
              Acciones
            </li>
          </ul>

          <section className="mt-3 max-h-28 md:max-h-80  overflow-y-auto scrollbar-hide">

            {/* {listaFiltrada.map((element) => (
              <Lista_CentroSalud
                key={element.id}
                dateCentroSalud={element}
                datosCentroSalud={datosCentroSalud}
                setDatosCentroSalud={setDatosCentroSalud}
              />
            ))}
              */}
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            <ListadoEmpresa />
            
          </section>
        </div>

        {/* Tarjetas para pantallas pequeñas */}
        {/* <div className="md:hidden grid grid-cols-1 gap-4">
          {listaFiltrada.map((element) => (
            <div key={element.id} className="bg-white p-4 rounded-xl shadow-lg">
              <h4 className="font-bold text-lg">{element.nombre}</h4>
              <p className="text-gray-600">{element.direccion}</p>
              <div className="flex justify-end mt-3 gap-2">
                {/* Aquí puedes agregar los botones de acciones */}
                {/* <button
                  className="bg-primary-900 text-white px-3 py-1 rounded-lg"
                  onClick={() =>
                    navigate(`/inicio/centrosalud/editar/${element.id}`)
                  }
                >
                  Editar
                </button>
                <button
                  className="bg-blue-950 text-white px-3 py-1 rounded-lg"
                  onClick={() =>
                    navigate(`/inicio/centrosalud/detalles/${element.id}`)
                  }
                >
                  Detalles
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => handleDeleteCentroSalud(element.id)}
                >
                  Eliminar
                </button>
              </div>
            </div> */}
          {/* ))} */}
        {/* </div> */}
      </main>
    </>
  );
};
export default ListadoGeneralEmpresa
