import { useState } from "react"
import Mensaje from "./Mensaje"




const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState("")

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if (!presupuesto || presupuesto < 0) {
            setMensaje("No es un presupuesto válido")

            return //de esta manera no se ejecutan las siguientes lines y se rompe el ciclo
        } else {
            setMensaje("")
            setIsValidPresupuesto(true)

        }

    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario" action="">
                <div className="campo">

                    <label htmlFor=""> Definir Presupuesto</label>

                    <input
                        className="nuevo-presupuesto"
                        placeholder="Añade tu Presupuesto"
                        type="number"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />

                </div>


                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            </form>
        </div>
    )
}

export default NuevoPresupuesto
