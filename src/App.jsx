import { useState, useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from "./components/Header"
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarID } from './helpers';
import IconoNuevoGasto from "./img/nuevo-gasto.svg"



function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : [])
  //hooks presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  //HOOKS MOdal
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [editarGasto, setEditarGasto] = useState({})
  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])



  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  //?guardar el presupuesto en  Localstorage.

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //? guardar los gastos en localStorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])







  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [editarGasto])


  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setEditarGasto({})

    } else {
      //nuevo gasto
      gasto.fecha = Date.now();
      gasto.id = generarID()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false);
    }, 400);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }


  return (
    <div className={modal ? 'fijar' : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto} />
      )}

    </div>
  )
}

export default App
