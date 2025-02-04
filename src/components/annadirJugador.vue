<template>
<form class="container">
    <h1>Formulario de Contacto</h1>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" placeholder="Ingresa el nombre del jugador" required v-model="nombre">
    
    <label for="equipo">Equipo:</label>
    <select name="equipo" id="equipo" v-model="equipoSeleccionado">
        <option v-for="equipo in equipos" :value="equipo">{{equipo.name}}</option>
    </select>
    <label for="goler">Numero de goles metidos</label>
    <input type="number" v-model="goles">
    <button @click="cargarJugadores">Enviar</button>
</form>
</template>
<script>
export default {
  data(){
    return{
        equipo: "",
        equipoSeleccionado: "",
        nombre: "",
        goles: "",
        equipoSeleccionado: ""
    }
  }, methods:  {
    cargarJugadores(){
        datosJugador = [
            name = this.nombre,
            team = this.equipoSeleccionado,
            score = this.goles
        ]
        fetch("http://localhost:3000/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosJugador)
        })
        .then(response => {
            if (response.ok) {
                this.reiniciarDatos()
            }
        })
        .catch(error => console.error("Error de conexión:", error));
    },
    reiniciarDatos(){
        this.equipoSeleccionado = "",
        this.nombre = "",
        this.goles = 0
    }
  },  mounted() {
    fetch("http://localhost:3000/clubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        this.equipos = data;
      })
      .catch((error) => {
        this.error = error.message;
      })
  },
}
</script>
<style>
body {
    font-family: Arial, sans-serif;
    background-color: #ffeceb;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

h1 {
    color: #ff4b44;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    text-align: left;
    margin-top: 10px;
    font-weight: bold;
}

input, button {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ff4b44;
    border-radius: 5px;
    font-size: 16px;
}

input:focus {
    outline: none;
    border-color: #ff4b44;
    box-shadow: 0 0 5px rgba(255, 75, 68, 0.5);
}

button {
    background-color: #ff4b44;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background-color: #d93d38;
}
</style>