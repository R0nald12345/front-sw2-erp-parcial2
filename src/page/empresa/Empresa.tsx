//import HeaderEmpresa from "@/src/components/empresa/HeaderEmpresa"
import ListEmpresa from "@/src/components/empresa/ListadoGeneralEmpresa"



const Empresa = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white/50 w-[95%] xl:w-[80%] mx-auto px-4 md:px-6 pb-6 md:pb-2">
        {/* <HeaderEmpresa/> */}
        <ListEmpresa/>
    </div>
  )
}

export default Empresa
