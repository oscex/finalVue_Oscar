<template>
    <div class="sidebar">
    <h2>Panel Administracion La Liga</h2>
    <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/VistaClasificacion">Clasificación</router-link></li>
        <li><router-link to="/VistaJornadas">Jornadas</router-link>
            <ul class="submenu">
                <li><router-link to="/VistaNuevoPartido">Nuevo Partido</router-link></li>
            </ul>
        </li>
        <li><router-link to="/VistaEquipos">Equipos</router-link></li>
        <li><router-link to="/VistaJugadores">Jugadores</router-link>
            <ul class="submenu">
                <li><router-link to="/VistaNuevoJugador">Añadir Jugador</router-link></li>
                <li><router-link to="/VistaEliminarJugador">Eliminar Jugador</router-link></li>
            </ul>
        </li>
    </ul>
</div>
  <router-view/>
</template>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff; /* Blanco */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
}

.logo-container {
    text-align: center;
}

.logo-container img {
    max-width: 400px; /* Tamaño del logo */
    width: 100%;
}

.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #ff4b44; /* Rojo fuerte */
    color: white;
    position: fixed;
    left: 0; /* Ahora está a la izquierda */
    top: 0;
    padding-top: 20px;
}

.sidebar h2 {
    text-align: center;
    font-size: 22px;
    margin-bottom: 20px;
    color: #ffffff; /* Blanco */
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.sidebar ul li a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    display: block;
    transition: 0.3s;
}

.sidebar ul li a:hover {
    background-color: #ffffff;
    color: #ff4b44;
    padding-left: 10px;
}

.submenu {
    padding-left: 20px;
    font-size: 16px;
}

.submenu li a {
    font-size: 16px;
    color: #ffcccb; /* Rojo claro */
}

.submenu li a:hover {
    background-color: #fff;
    color: #ff4b44;
}
.temporada{
    color: #ff4b44;
}
</style>
