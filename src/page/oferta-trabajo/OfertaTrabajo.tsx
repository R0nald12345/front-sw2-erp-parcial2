import HeaderOfertaTrabajo from "@/src/components/ofertaTrabajo/HeaderOfertaTrabajo"
import ListadoGeneralOfertaTrabajo from "@/src/components/ofertaTrabajo/ListadoGeneralOfertaTrabajo"

const OfertaTrabajo = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white/50 w-[95%] xl:w-[80%] mx-auto px-4 md:px-6 pb-6 md:pb-2 mt-12">
        <HeaderOfertaTrabajo/>
        <ListadoGeneralOfertaTrabajo/>
    </div>
  )
}

export default OfertaTrabajo
