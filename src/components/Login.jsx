import React, { useState, useEffect } from 'react';
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
    const [ingreso, setIngreso] = useState(false);

    let miStorage = window.localStorage;
  
    useEffect(() => {
        if (miStorage.getItem("Parse/bLcobi0e0YtluXFAjgJ6F3QxdMX05jD1VlXj2pAH/currentUser") != null) {
            setIngreso(true);
        } else {
            setIngreso(false);
        }
    }, [miStorage]);

    // Function that will return current user and also update current username
    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        setCurrentUser(currentUser);
        return currentUser;
    };

    const doUserLogIn = async function (e) {
        e.preventDefault();
        const usernameValue = username;
        const passwordValue = password;
        try {
            const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
            alert(`Success! User ${loggedInUser.get('username')} has successfully signed in!`);
            const currentUser = await Parse.User.current();
            console.log(loggedInUser === currentUser);
            setUsername('');
            setPassword('');
            getCurrentUser();
            const nuevaURL = `/Administrador`;

            window.history.pushState({}, '', nuevaURL);
            window.location.reload(); // O eliminar si no es necesario recargar
            return true;
        } catch (error) {
            alert(`Error! ${error.message}`);
            return false;
        }
    };

    const doUserLogOut = async function () {
        try {
            await Parse.User.logOut();
            const currentUser = await Parse.User.current();
            if (currentUser === null) {
                alert('Success! No user is logged in anymore!');
            }
            getCurrentUser();
            window.history.pushState({}, '', '/'); // Redirigir a la página de inicio
            return true;
        } catch (error) {
            alert(`Error! ${error.message}`);
            return false;
        }
    };

    return (
        <>
            {!ingreso && <div className="col-6">
                <h2>INICIO DE SESIÓN</h2>
                <form className="d-flex flex-column justify-content-center">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico y/o usuario</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Ingresa tu correo"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => doUserLogIn(e)}>INGRESAR</button>
                </form>
            </div>}
            {ingreso && <div className="col-6">
                <h2>Cerrar Sesión</h2>
                <form className="d-flex flex-column justify-content-center">
                    <button type="submit" className="btn btn-primary" onClick={() => doUserLogOut()}>Cerrar Sesión</button>
                </form>
            </div>}
        </>
    );
}
