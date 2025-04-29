import React, {useState, useEffect} from 'react';
import Parse from 'parse/dist/parse.min.js';
import '../css/Relatos.css'
import { Link, useLocation} from 'react-router-dom';



const PARSE_APPLICATION_ID = 'bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EhPnGEvN80RWJlmnZA4pRaIfeeamCvHgK2g5P00l';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function Administrator() {

    
  const [data, setdata] = useState([]);
  const [ingreso,setIngreso] = useState(false);
  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Relatos');
    // run the query
    const datos = await query.find();
    setdata(datos)
  
  }
  useEffect(()=>{
    fetchPerson()
  },[setdata])

  let miStorage = window.localStorage;
  useEffect(()=>{
    if(miStorage.getItem("Parse/bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH/currentUser") != null){
      setIngreso(true)
    }else{
      setIngreso(false)
    }
  },[miStorage])
  useEffect(()=>{
 
    console.log(data);
    
  },[data])


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
  async function ActualizarAprov(e, relatoId){
    const estaAprobado = e.target.checked;

    const Relato = Parse.Object.extend('Relatos');
    const query = new Parse.Query(Relato);

    // Realiza las acciones que necesites con el id del relato y el estado del checkbox
    try {
        // Obtener el objeto Relato correspondiente al relatoId
        const relato = await query.get(relatoId);
  
        // Actualizar la propiedad 'Aprobado' del objeto Relato
        relato.set('Aprobado', estaAprobado);
  
        // Guardar el objeto actualizado en la base de datos
        await relato.save();
  
        // Volver a cargar los datos después de la actualización
        fetchPerson();
        
        console.log(`Relato ID: ${relatoId}, Aprobado actualizado a: ${estaAprobado}`);
      } catch (error) {
        console.error('Error al actualizar el relato:', error);
      }
  }

  return (
    <>
    <div className="row">
      {ingreso && data.reverse().map((relato, idx) =>{

        let Urls=relato.get('URLDescargas')
        let Categorias = relato.get('Categorias')
        let objectId = relato.get('id')
        console.log(relato.id);
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
                <label className='d-flex align-items-center justify-content-center' >
                Aprobado:
                <input className='ms-2' type="checkbox" id={`check${idx}`}  onChange={(e) => ActualizarAprov(e, relato.id)} checked={relato.get('Aprobado')}/>
                </label>
              </div>
            </a>
            </>
        
          )
        
      }
    )}    
        </div>
    </>
  )
}
