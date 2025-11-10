import HeaderOfertaTrabajo from "@/src/components/ofertaTrabajo/HeaderOfertaTrabajo"
import ListadoGeneralOfertaTrabajo from "@/src/components/ofertaTrabajo/ListadoGeneralOfertaTrabajo"

const OfertaTrabajo = () => {
  return (
    <div className="w-full mx-auto">
        <HeaderOfertaTrabajo/>
        <ListadoGeneralOfertaTrabajo/>
    </div>
  )
}

export default OfertaTrabajo
