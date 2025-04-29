import React, { useState, useEffect,useRef} from 'react';
import '../css/form.css';
// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';
import { storage } from "../firebaseConfig";
import {uploadBytes,getDownloadURL, ref as refStorage,deleteObject} from "firebase/storage";
import Map from './map';
import '../css/Relatos.css'



// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EhPnGEvN80RWJlmnZA4pRaIfeeamCvHgK2g5P00l';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export default function Form() {

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [position, setPosition] = useState(null);

  const handlePositionChange = (newPosition) => {
    setFormState((prevState) => ({ ...prevState, position: newPosition }));
  };
 
  
  const handleFileChange = (event) => {
    const files = event.target.files;
    
    // Limita la cantidad de archivos seleccionados a 3
    if (files.length <= 3) {
      setSelectedFiles([...files]);
    } else {
      alert('Solo se permiten un máximo de 3 imágenes');
      setSelectedFiles([0]);
      event.target.value ='';
    
    }
  };
  

  const handleCategoriaSeleccionada = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      // Si la categoría ya está seleccionada, la eliminamos de las selecciones.
      const nuevasCategorias = categoriasSeleccionadas.filter(
        (c) => c !== categoria
      );
      setCategoriasSeleccionadas(nuevasCategorias);
    } else if (categoriasSeleccionadas.length < 3) {
      // Si aún no se han seleccionado 3 categorías, agregamos la nueva categoría.
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };
  const resetForm = () => {
    document.getElementById('Nombre').value = '';
    document.getElementById('selectLocalidad').value = '0';
    document.getElementById('NombreRelato').value = '';
    document.getElementById('SubNombreRelato').value = '';
    document.getElementById('Redaccion').value = '';
    document.getElementById('referencias').value = '';
  };
  
      
  const Submeit =async (e) =>{
    e.preventDefault();
    var nombre = e.target.Nombre.value
    var localidad = e.target.selectLocalidad.value
    var nombreRelato = e.target.NombreRelato.value
    var subNombreRelato = e.target.SubNombreRelato.value
    var redaccion = e.target.Redaccion.value
    var referencias = e.target.referencias.value
   
    const urlDescargas=[];
    const nameDescargas=[];
      for(var i=0;i<selectedFiles.length;i++){
       
        const archivoRef = refStorage(storage,`documentos/${nombreRelato}/${selectedFiles[i].name}`);
            //Cargar Archivo
        await uploadBytes(archivoRef,selectedFiles[i]);
            //Obtener Url
        urlDescargas.push(await getDownloadURL(archivoRef));
        console.log("logrado");
        nameDescargas.push(selectedFiles[i].name);
    }
    let Relato = {
      Nombre: nombre,
      Localidad: localidad,
      Categorias: categoriasSeleccionadas,
      Position: position,
      NombreRelato: nombreRelato,
      SubNombreRelato: subNombreRelato,
      Redaccion: redaccion,
      URLDescargas: urlDescargas,
      Referencias: referencias,
  }
  
  addRelato(Relato);
  }


 
  async function addRelato(Relato) {
    try {
      // create a new Parse Object instance
      const Relatos = new Parse.Object('Relatos');
      // define the attributes you want for your Object
      Relatos.set('Nombre', Relato.Nombre);
      Relatos.set('Localidad', Relato.Localidad);
      Relatos.set('Categorias', Relato.Categorias);
      Relatos.set('NombreRelato', Relato.NombreRelato);
      Relatos.set('SubNombreRelato', Relato.SubNombreRelato);
      Relatos.set('Redaccion', Relato.Redaccion);
      Relatos.set('Position', Relato.Position);
      Relatos.set('URLDescargas', Relato.URLDescargas);
      Relatos.set('Referencias', Relato.Referencias);

      // save it on Back4App Data Store
      console.log(Relatos);
      await Relatos.save();
      resetForm();
      alert('Relato Guardado!');
      window.location.reload()
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }


  return (
    <>
      <section>
        <form className='formulario' onSubmit={Submeit}>
        <h2>INFORMACIÓN DEL AUTOR</h2>

          <div className="mb-3">
            <label htmlFor="Nombre" className="form-label">NOMBRE Y APELLIDO</label>
            <div id="nombreHelp" className="form-text">(En caso de no querer identificarte ingresa "Anonimo")
            </div>

            <input name='Nombre' type="text" className="form-control" aria-describedby="nombreHelp"
              placeholder="(Introduzca su nombre)" required></input>
          </div>
        
          <div className="mb-3">
            <label htmlFor="selectLocalidad" className="form-label">LOCALIDAD</label>

            <select name='selectLocalidad' defaultValue="0" className="form-select" aria-label="Default select example">
              <option value="0" disabled>(Seleccione la localidad)</option>
              <option value="Engativa">Engativa</option>
              <option value="Candelaria">Candelaria</option>
              <option value="Suba">Suba</option>
            </select>
          </div>
          <h2>INGRESA TU RELATO</h2>
          <div className="mb-3">
          <label htmlFor="selectCategoria" className="form-label">TIPO DE PERFIL</label>
          <br />
       
        <input type="checkbox"  className={`btn-check ${categoriasSeleccionadas.includes('SEGURIDAD') ? 'color-seguridad' : ''}`} id="btn-check-2-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('SEGURIDAD')}
        onChange={() => handleCategoriaSeleccionada('SEGURIDAD')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('SEGURIDAD') ? 'color-seguridad' : ''}`} htmlFor="btn-check-2-outlined">SEGURIDAD</label>

        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('CULTURA') ? 'color-cultura' : ''}`} id="btn-check-3-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('CULTURA')}
        onChange={() => handleCategoriaSeleccionada('CULTURA')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('CULTURA') ? 'color-cultura' : ''}`} htmlFor="btn-check-3-outlined">CULTURA</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('ESPACIO PUBLICO') ? 'color-espacio-publico' : ''}`} id="btn-check-4-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('ESPACIO PUBLICO')}
        onChange={() => handleCategoriaSeleccionada('ESPACIO PUBLICO')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('ESPACIO PUBLICO') ? 'color-espacio-publico' : ''}`} htmlFor="btn-check-4-outlined">ESPACIO PÚBLICO</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('EVENTOS') ? 'color-eventos' : ''}`} id="btn-check-5-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('EVENTOS')}
        onChange={() => handleCategoriaSeleccionada('EVENTOS')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('EVENTOS') ? 'color-eventos' : ''}`} htmlFor="btn-check-5-outlined">EVENTOS</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('PATRIMONIO') ? 'color-patrimonio' : ''}`} id="btn-check-6-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('PATRIMONIO')}
        onChange={() => handleCategoriaSeleccionada('PATRIMONIO')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('PATRIMONIO') ? 'color-patrimonio' : ''}`} htmlFor="btn-check-6-outlined">PATRIMONIO</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN') ? 'color-medio-ambiente' : ''}`} id="btn-check-7-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN')}
        onChange={() => handleCategoriaSeleccionada('MEDIO AMBIENTE Y CONTAMINACIÓN')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('MEDIO AMBIENTE Y CONTAMINACIÓN') ? 'color-medio-ambiente' : ''}`} htmlFor="btn-check-7-outlined">MEDIO AMBIENTE Y CONTAMINACIÓN</label>
              
        <input type="checkbox" className={`btn-check ${categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE') ? 'color-movilidad' : ''}`} id="btn-check-8-outlined" autoComplete="off" checked={categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE')}
        onChange={() => handleCategoriaSeleccionada('MOVILIDAD Y TRANSPORTE')}></input>
        <label className={`btn btn-outline-secondary me-2 mb-2 ${categoriasSeleccionadas.includes('MOVILIDAD Y TRANSPORTE') ? 'color-movilidad' : ''}`} htmlFor="btn-check-8-outlined">MOVILIDAD Y TRANSPORTE</label>
      </div>
    
          <div className="mb-3">
            <label htmlFor="NombreRelato" className="form-label">TÍTULO DEL RELATO</label>
            <div className="form-text">(Ingresa el título de tu relato que permita reconocer el tema a tratar)
            </div>
            <input name='NombreRelato' type="text" className="form-control" aria-describedby="NombreRelato"
              placeholder="(Escriba aquí su título)" required></input>
          </div>
          <div className="mb-3">
            <label htmlFor="SubNombreRelato" className="form-label">SUBTITULO DEL RELATO</label>
            <div  className="form-text">(Ingresa un subtítulo mas claro de tu relato que permita reconocer el tema
              a tratar)</div>
            <input name='SubNombreRelato' type="text" className="form-control"  aria-describedby="SubNombreRelato"
              placeholder="(Escriba aquí su subtítulo)" required></input>
          </div>
          <div className="mb-3">
        <label htmlFor="Redaccion" className="form-label">REDACCIÓN</label>
        <div className="form-text">(Ingresa la información que quieras incluir para los lectores, máximo 1000
          palabras)</div>
        <textarea name='Redaccion' className="form-control" rows="3"
          placeholder="(Ingrese la información del relato)" required></textarea>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">GEOLOCALIZACIÓN</label>
            <div id="emailHelp" className="form-text">(Selecciona la ubicación del relato)</div>
            <div id="map">
              <Map client:only PositionChange={handlePositionChange}/>

            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">CONTENIDO MULTIMEDIA</label>
            <div id="emailHelp" className="form-text">(Adjunta imágenes)</div>

            <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
              aria-label="Upload" multiple onChange={handleFileChange} required></input>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="referencias" className="form-label">REFERENCIAS</label>
        <div className="form-text">(Para agregar varias referencias separelas por ",")</div>
        <textarea name='referencias' className="form-control" id="exampleFormControlTextarea1" rows="3"
          placeholder="(Agregar referencias “links”)" required></textarea>
      </div>
      <button type='submit'   className="btn btn-primary mb-5" data-bs-toggle="modal"
        data-bs-target="#exampleModal2">Enviar</button>
        </form>
      </section>

      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content modall ">
          <div className="modal-body ">
            <div className="row align-items-center">

              <div className="col-6">
                <p className="subtitle text-center"> GRACIAS POR SU CONTRIBUCIÓN AL DESARROLLO DE NUESTRO ENTORNO.</p>
                <p className="text">Su relato se ha completado y enviado correctamente. En el transcurso de 3 a 5 días hábiles
                  podrá visualizarlo en nuestra galería. En caso de no ser así, debe ponerse en contacto con nosotros para
                  brindarle una solución. <br></br> Cordialmente:</p>
                <h4 className='text-center'>MAPEANDO LUGARES</h4>
                <div className="d-flex">
                  <div className="butt3 ">
                    <a className="ButtonV" href="/">INICIO</a>
                  </div>
                  <div className="butt3 ">
                    <a className="ButtonV" href="/Relatos">VER RELATOS</a>
                  </div>
                </div>

              </div>
              <div className="col-6 d-flex flex-column">
                <img src="images/Logo.png" alt="logo"></img>
                <p className="text-center">SEMILLERO DE INVESTIGACIÓN VTS</p>
                <p className="text-center">SEMILLERO DE INVESTIGACION SAVARC</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

<style>
  
</style>