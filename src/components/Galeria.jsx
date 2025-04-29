import React,{useState,useEffect} from 'react'
import Parse from 'parse/dist/parse.min.js';
import '../css/Relatos.css'


const PARSE_APPLICATION_ID = 'bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EhPnGEvN80RWJlmnZA4pRaIfeeamCvHgK2g5P00l';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function Galeria() {

  const [data, setdata] = useState([]);


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

  useEffect(()=>{
 
    console.log(data);
  },[data])



  return (
    <>
    { data.map((relato, idx) =>{

let Urls=relato.get('URLDescargas')
return(
  <>
  <div className="row">
  {Urls.map((image,id)=>{
            return(
                <a className="col-3 mb-4 me-auto ms-auto mt-3 justify-content-center text-decoration-none galeria" href={`/Relato?ID=${relato.id}`}>
                    <img src={image}></img>
                    <h3 className="nombre">{relato.get('NombreRelato')}</h3>

                </a>
            )
        })}
    
  </div>
  </>

)
}
)}    
    </>
  )
}
