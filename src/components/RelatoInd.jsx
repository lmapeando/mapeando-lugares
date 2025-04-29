import React, {useState,useEffect} from 'react';
import Parse from 'parse/dist/parse.min.js';
import '../css/Relatos.css';
import Maprelato from './Maprelato.jsx'

const PARSE_APPLICATION_ID = 'bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EhPnGEvN80RWJlmnZA4pRaIfeeamCvHgK2g5P00l';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function RelatoInd() {
  const [data, setdata] = useState([]);
  const [referencia,setReferencias] = useState([]);
  const [categoria,setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

    let query = new URLSearchParams(window.location.search);
    let id = query.get('ID');
    console.log(id);

    async function getRelato() {
        const queryy = new Parse.Query('Relatos');
        queryy.equalTo('objectId', id);
        try {
          const datos = await queryy.first();
          console.log(datos);
          setCategorias(datos.get('Categorias'))
          setReferencias(datos.get('Referencias').split(','))
          setdata(datos);
        } catch (error) {
          console.error('Error al cargar datos:', error);
        } finally {
          setLoading(false); // Indicar que la carga ha finalizado
        }
    }

    useEffect(()=>{  
      getRelato()
    },[id])
    let referencias =[]
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

      if (loading) {
        return <p>Cargando datos...</p>;
      }


  return (
    <>
      <div className="row relato">
      <div className="col-3 ">
          <img src={data.get('URLDescargas')[0]}></img>
          <h3 className="nombre">{data.get('NombreRelato')}</h3>
          <div className='categorias d-flex justify-content-center'>{categoria.map((cat,id)=>{
                console.log(cat);
                return(
                  <i className={`bi bi-circle-fill me-2 ${categoriaColores[cat]}`}></i>
                )
              })}</div>
          <p className="localidad">{data.get('Localidad')}</p>
        </div>
        <div className="col-9"><p className='cuerpoRegular'>{data.get('Redaccion')}</p></div>
      </div>
      <h2>INFORMACIÓN MULTIMEDIA</h2>
      <div className="row images m-auto">
      {data.get('URLDescargas').map((url,id)=>{
          return(
          <div className="col-4">
            <img src={url}></img>
          </div>
          )
      })}
      </div>
      <div className="row">
        <div className="col-6">
          <h3>GEOLOCALIZACIÓN</h3>
          <div className="map">
          <Maprelato  client:only ubi={data.get("Position")}/>
          <p className="localidad">{data.get('Localidad')}</p>

          </div>
        </div>
        <div className="col-6">
          <h3>REFERENCIAS</h3>
          <ul>
          {referencia.map((ref, id) => {
        console.log(ref);
        return(<li className='cuerpoRegular' key={id}>{ref}</li>)
      }
        
      )}
          </ul>
          
        </div>
      </div>
    </>
  )
}

