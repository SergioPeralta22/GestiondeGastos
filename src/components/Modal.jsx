import { useState, useEffect } from "react";
import cerrar from "../img/cerrar.svg";
import Mensaje from "./Mensaje";


const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, editarGasto, setEditarGasto }) => {
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")

    //? state de validacion del submit
    const [mensaje, setMensaje] = useState("")
    const [fecha, setFecha] = useState("")
    const [id, setId] = useState("")


    useEffect(() => {
        if (Object.keys(editarGasto).length > 0) {
            setNombre(editarGasto.nombre)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
            setFecha(editarGasto.fecha)
            setId(editarGasto.id)
        }
    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)
        setEditarGasto({})
        setTimeout(() => {
            setModal(false);
        }, 400);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios.")

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={cerrar} alt="cerrar modal" onClick={ocultarModal} />
            </div>

            <form
                action=""
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleSubmit}
            >
                <legend>{editarGasto.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre del Gasto:</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="nombre">Cantidad:</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade el monto del gasto. Ej. 300"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoria:</label>

                    <select
                        name=""
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >

                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="subscripciones">Subscripciones</option>
                        <option value="varios">Gastos Varios</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={editarGasto.nombre ? "Guardar Cambios" : "Añadir Gasto"}
                />

            </form>
        </div>
    );
};

export default Modal;
