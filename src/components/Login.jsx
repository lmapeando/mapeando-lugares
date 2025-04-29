import React,{useState,useEffect} from 'react'
import Parse from 'parse/dist/parse.min.js';


const PARSE_APPLICATION_ID = 'bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EhPnGEvN80RWJlmnZA4pRaIfeeamCvHgK2g5P00l';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [ingreso,setIngreso] = useState(false);

  

    let miStorage = window.localStorage;
  useEffect(()=>{
    if(miStorage.getItem("Parse/bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH/currentUser") != null){
      setIngreso(true)
    }else{
      setIngreso(false)
    }
    console.log(ingreso);
  },[miStorage])
     // Function that will return current user and also update current username
    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    }; 

    const doUserLogIn = async function (e) {
        e.preventDefault()
        // Note that these values come from state variables that we've declared before
        const usernameValue = username;
        const passwordValue = password;
        console.log(username + " " + password);
        try {
            const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
            // logIn returns the corresponding ParseUser object
            alert(
                `Success! User ${loggedInUser.get(
                'username'
                )} has successfully signed in!`
            );
            // To verify that this is in fact the current user, `current` can be used
            const currentUser = await Parse.User.current();
            console.log(loggedInUser === currentUser);
            // Clear input fields
            setUsername('');
            setPassword('');
            // Update state variable holding current user
            getCurrentUser();
            const nuevaURL = `/Administrador`;

            // Modificar la URL sin recargar la página
            window.history.pushState({}, '', nuevaURL);  
            window.location.reload()

          return true;
        } catch (error) {
          // Error can be caused by wrong parameters or lack of Internet connection
          alert(`Error! ${error.message}`);
          return false;
        }
      };

      const doUserLogOut = async function () {
        try {
          await Parse.User.logOut();
          // To verify that current user is now empty, currentAsync can be used
          const currentUser = await Parse.User.current();
          if (currentUser === null) {
            alert('Success! No user is logged in anymore!');
          }
          // Update state variable holding current user
          getCurrentUser();
          return true;
        } catch (error) {
          alert(`Error! ${error.message}`);
          return false;
        }
      };


  return (
    <>
        {!ingreso && <div class="col-6">
            <h2>INICIO DE SESIÓN</h2>
            <form class="d-flex flex-column justify-content-center">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Correo electrónico y/o usuario</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo" value={username}
            onChange={(event) => setUsername(event.target.value)}></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Ingresa tu contraseña" value={password}
            onChange={(event) => setPassword(event.target.value)}></input>
                </div>
                <button type="submit" class="btn btn-primary" onClick={(e) => doUserLogIn(e)}>INGRESAR</button>
            </form>
        </div>}
        {ingreso && <div class="col-6">
            <h2>Cerrar Sesion</h2>
                <form class="d-flex flex-column justify-content-center">
                    
                    <button type="submit" class="btn btn-primary" onClick={() => doUserLogOut()}>Cerrar Sesion</button>
                </form>
            </div>}
    </>
  )
}
