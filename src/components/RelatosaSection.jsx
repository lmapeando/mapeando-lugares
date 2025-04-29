import React, {useState, useEffect} from 'react';
import Parse from 'parse/dist/parse.min.js';
import '../css/Relatos.css'
import { Link, useLocation} from 'react-router-dom';



const PARSE_APPLICATION_ID = 'bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EhPnGEvN80RWJlmnZA4pRaIfeeamCvHgK2g5P00l';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function RelatosaSection() {

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(['TODOS']);
  const [data, setdata] = useState([]);

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Relatos');
    // run the query
    const datos = await query.find();
    setdata(datos)
  //   datos.map( e=>{

  //     let Relato = {
  //       Nombre: e.get('Nombre'),
  //       Localidad: e.get('Localidad'),
  //       Categorias: e.get('Categorias'),
  //       NombreRelato: e.get('NombreRelato'),
  //       SubNombreRelato: e.get('SubNombreRelato'),
  //       Redaccion: e.get('Redaccion'),
  //       URLDescargas: e.get('URLDescargas'),
  //       Referencias: e.get('Referencias'),
  //   }

  //   const relatosJson = JSON.stringify(Relato);


  //   setdata(JSON.parse(relatosJson))
  // })
  }
  useEffect(()=>{
    fetchPerson()
  },[setdata])

  useEffect(()=>{
 
    console.log(data);
  },[data])

  const handleCategoriaSeleccionada = (categoria) => {
      
      setCategoriasSeleccionadas(categoria);
      const nuevaURL = `/Relatos?categ=${categoria}`;

      // Modificar la URL sin recargar la página
      window.history.pushState({}, '', nuevaURL);

  };

  const categoriaColores = {
    'TODOS': 'color-todos',
    'SEGURIDAD': 'color-seguridadI',
    'CULTURA': 'color-culturaI',
    'ESPACIO PUBLICO': 'color-espacio-publicoI',
    'EVENTOS': 'color-eventosI',
    'PATRIMONIO': 'color-patrimonioI',
    'MEDIO AMBIENTE Y CONTAMINACIÓN': 'color-medio-ambienteI',
    'MOVILIDAD Y TRANSPORTE': 'color-movilidadI',
  };

  return (
    <>
      <div className="chec mb-3 mt-3 ms-5">
        <input type="checkbox"  className={`btn-check ${categoriasSeleccionadas.includes('TODOS') ? 'color-todos' : ''}`} id="btn-check-1-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('TODOS')}
        onChange={() => handleCategoriaSeleccionada('TODOS')} ></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('TODOS') ? 'color-todos' : ''}`} htmlFor="btn-check-1-outlined">TODOS</label>

        <input type="checkbox"  className={`btn-check ${categoriasSeleccionadas.includes('SEGURIDAD') ? 'color-seguridad' : ''}`} id="btn-check-2-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('SEGURIDAD')}
        onChange={() => handleCategoriaSeleccionada('SEGURIDAD')}></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('SEGURIDAD') ? 'color-seguridad' : ''}`} htmlFor="btn-check-2-outlined"><a href={`/Relatos?categ=SEGURIDAD`}></a>SEGURIDAD</label>

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
        onChange={() => handleCategoriaSeleccionada('PATRIMONIO')} ></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('PATRIMONIO') ? 'color-patrimonio' : ''}`} htmlFor="btn-check-6-outlined">PATRIMONIO</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN') ? 'color-medio-ambiente' : ''}`} id="btn-check-7-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN')}
        onChange={() => handleCategoriaSeleccionada('MEDIO AMBIENTE Y CONTAMINACIÓN')} ></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN') ? 'color-medio-ambiente' : ''}`} htmlFor="btn-check-7-outlined">MEDIO AMBIENTE Y CONTAMINACIÓN</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE') ? 'color-movilidad' : ''}`} id="btn-check-8-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE')}
        onChange={() => handleCategoriaSeleccionada('MOVILIDAD Y TRANSPORTE')} ></input>
        <label className={`btn btn-outline-secondary me-2 ${categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE') ? 'color-movilidad' : ''}`} htmlFor="btn-check-8-outlined">MOVILIDAD Y TRANSPORTE</label>
      </div>
      <div className="row">
      { data.reverse().map((relato, idx) =>{

        let Urls=relato.get('URLDescargas')
        let Categorias = relato.get('Categorias')
        let Aprobado = relato.get('Aprobado')
        if(Aprobado){
          if(categoriasSeleccionadas == "" || categoriasSeleccionadas == "TODOS"){
            return(
              <>
              <a className="col-3 text-decoration-none d-flex justify-content-center mt-5" href={`/Relato?ID=${relato.id}`}>
              <div className="CardRelatos" key={idx}>
                  <img src={Urls[0]}></img>
                  <h3 className="nombre">{relato.get('NombreRelato')}</h3>
                  <div className='categorias'>{Categorias.map((cat,id)=>{
                    
                    return(
                      <i key={id} className={`bi bi-circle-fill me-2 ${categoriaColores[cat]}`}></i>
                    )
                  })}</div>
                  <p className="redaccion">{relato.get('Redaccion').substring(0,150)}...</p>
                  <p className="localidad">{relato.get('Localidad')}</p>
                </div>
              </a>
              </>
          
            )
          }
          else if(Categorias.includes(categoriasSeleccionadas)){
            return(
              <>
              <a className="col-3 text-decoration-none d-flex justify-content-center mt-5" href={`/Relato?ID=${relato.id}`}>
              <div className="CardRelatos" key={idx}>
                  <img src={Urls[0]}></img>
                  <h3 className="nombre">{relato.get('NombreRelato')}</h3>
                  <div className='categorias'>{Categorias.map((cat,id)=>{
                    
                    return(
                      <i key={id} className={`bi bi-circle-fill me-2 ${categoriaColores[cat]}`}></i>
                    )
                  })}</div>
                  <p className="redaccion">{relato.get('Redaccion').substring(0,150)}...</p>
                  <p className="localidad">{relato.get('Localidad')}</p>
                </div>
              </a>
              </>
          
            )
          }
        }

        
        
      }
    )}    
        </div>

    </>
  )
}
