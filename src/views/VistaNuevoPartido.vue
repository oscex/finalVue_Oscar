<template>
    <form class="container">
        <h1>Crear Partido</h1>
        <label for="Jornada">Jornada:</label>
        <input type="number" v-model="jornadaSelecionada">
        
        <input type="date" v-model="fechaSeleccionada">
        <label for="equipo1">Equipo 1:</label>
        <select name="equipo" id="equipo" v-model="equipoSeleccionado1">
            <option v-for="equipo in teams1" :key="equipo.name">{{equipo.name}}</option>
        </select>
        <label for="equipo2">Equipo 2:</label>
        <select name="equipo" id="equipo" v-model="equipoSeleccionado2">
            <option v-for="equipo in teams2" :key="equipo.name">{{equipo.name}}</option>
        </select>
        <button @click="cargarJornada">Enviar</button>
    </form>
    </template>
    <script>
    export default {
      data(){
        return{
            equipos: [],
            equipoSeleccionado1: "",
            equipoSeleccionado2: "",
            jornadaSelecionada: "",
            fechaSeleccionada: ""
        }
      }, methods:  {
        cargarJornada(){
            let datosJornada = {
                round:  "Jornada " + this.jornadaSelecionada ,
                date: this.fechaSeleccionada,
                tema1: this.equipoSeleccionado1,
                team2: this.equipoSeleccionado2
            }
    
            fetch("http://localhost:3000/matches", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosJornada)
            })
            .then(response => {
                if (response.ok) {
                    this.reiniciarDatos()
                }
            })
            .catch(error => console.error("Error de conexión:", error));
        },
        reiniciarDatos(){
            this.nombre = "",
            this.fechaSeleccionada = "",
            this.equipoSeleccionado1 = "",
            this.equipoSeleccionado2 = ""
        },
        cargarEquipos() {
            fetch("http://localhost:3000/clubs")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al cargar los datos");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.equipos = data;
          })
          .catch((error) => {
            this.error = error.message;
          })
        }
      },
      created() {
        this.cargarEquipos();
      }, computed: {
        teams1() {
            return this.equipos.filter(equipo => equipo.name !== this.equipoSeleccionado2);

        },
        teams2() {
            return this.equipos.filter(equipo => equipo.name !== this.equipoSeleccionado1);

        }
      }
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