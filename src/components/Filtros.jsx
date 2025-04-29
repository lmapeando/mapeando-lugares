import React,{useState} from 'react'
import '../css/Relatos.css'

export default function Filtros() {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(['TODOS']);


  const handleCategoriaSeleccionada = (categoria) => {
    
    setCategoriasSeleccionadas(categoria);
    const nuevaURL = `/Relatos?categ=${categoria}`;

      // Modificar la URL sin recargar la página
      window.history.pushState({}, '', nuevaURL);  
      window.location.reload()
};

  return (
    <div className="mb-3">
        <input type="checkbox"  className={`btn-check ${categoriasSeleccionadas.includes('TODOS') ? 'color-todos' : ''}`} id="btn-check-1-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('TODOS')}
        onChange={() => handleCategoriaSeleccionada('TODOS')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('TODOS') ? 'color-todos' : ''}`} htmlFor="btn-check-1-outlined">TODOS</label>

        <input type="checkbox"  className={`btn-check ${categoriasSeleccionadas.includes('SEGURIDAD') ? 'color-seguridad' : ''}`} id="btn-check-2-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('SEGURIDAD')}
        onChange={() => handleCategoriaSeleccionada('SEGURIDAD')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('SEGURIDAD') ? 'color-seguridad' : ''}`} htmlFor="btn-check-2-outlined">SEGURIDAD</label>

        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('CULTURA') ? 'color-cultura' : ''}`} id="btn-check-3-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('CULTURA')}
        onChange={() => handleCategoriaSeleccionada('CULTURA')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('CULTURA') ? 'color-cultura' : ''}`} htmlFor="btn-check-3-outlined">CULTURA</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('ESPACIO PUBLICO') ? 'color-espacio-publico' : ''}`} id="btn-check-4-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('ESPACIO PUBLICO')}
        onChange={() => handleCategoriaSeleccionada('ESPACIO PUBLICO')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('ESPACIO PUBLICO') ? 'color-espacio-publico' : ''}`} htmlFor="btn-check-4-outlined">ESPACIO PÚBLICO</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('EVENTOS') ? 'color-eventos' : ''}`} id="btn-check-5-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('EVENTOS')}
        onChange={() => handleCategoriaSeleccionada('EVENTOS')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('EVENTOS') ? 'color-eventos' : ''}`} htmlFor="btn-check-5-outlined">EVENTOS</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('PATRIMONIO') ? 'color-patrimonio' : ''}`} id="btn-check-6-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('PATRIMONIO')}
        onChange={() => handleCategoriaSeleccionada('PATRIMONIO')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('PATRIMONIO') ? 'color-patrimonio' : ''}`} htmlFor="btn-check-6-outlined">PATRIMONIO</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN') ? 'color-medio-ambiente' : ''}`} id="btn-check-7-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN')}
        onChange={() => handleCategoriaSeleccionada('MEDIO AMBIENTE Y CONTAMINACIÓN')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN') ? 'color-medio-ambiente' : ''}`} htmlFor="btn-check-7-outlined">MEDIO AMBIENTE Y CONTAMINACIÓN</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE') ? 'color-movilidad' : ''}`} id="btn-check-8-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE')}
        onChange={() => handleCategoriaSeleccionada('MOVILIDAD Y TRANSPORTE')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE') ? 'color-movilidad' : ''}`} htmlFor="btn-check-8-outlined">MOVILIDAD Y TRANSPORTE</label>
      </div>
  )
}
