<template>
            <h2>Equipos</h2>
    <div class="container">
      <div class="jugadores-container">
        <div class="equipos">
          <ul>
            <li 
              v-for="equipo in equipos" 
              :key="equipo.id" 
              @click="seleccionarEquipo(equipo)"
              :class="{ seleccionado: equipoSeleccionado === equipo }"
            >
              {{ equipo.name }}
            </li>
          </ul>
        </div>
  
        <div class="detalle-jugadores">
          <h2 v-if="equipoSeleccionado">Jugadores de {{ equipoSeleccionado.name }}</h2>
          
          <ul v-if="jugadores.length">
            <li 
              v-for="jugador in jugadores" 
              :key="jugador.id"
              @click="seleccionarJugador(jugador)"
            >
              {{ jugador.name }}
            </li>
          </ul>
  
          <div v-if="jugadorSeleccionado">
            <h3>{{ jugadorSeleccionado.name }}</h3>
            <div>
              <label for="goles">Goles a añadir:</label>
              <input type="number" v-model="nuevosGoles" min="0" />
            </div>
            <button @click="sumarGoles">Sumar Goles</button>
            <button @click="eliminarJugador">Eliminar Jugador</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        equipos: [],
        equipoSeleccionado: null,
        jugadores: [],
        jugadorSeleccionado: null,
        nuevosGoles: 0
      };
    },
    methods: {
      cargarEquipos() {
        fetch("http://localhost:3000/clubs")
          .then(response => response.json())
          .then(data => {
            this.equipos = data;
          })
          .catch(error => console.error("Error cargando equipos:", error));
      },
  
      seleccionarEquipo(equipo) {
        this.jugadorSeleccionado = null;
        this.equipoSeleccionado = equipo;
        this.cargarJugadores(equipo.name);
      },
  
      cargarJugadores(nombreEquipo) {
        fetch("http://localhost:3000/players")
          .then(response => response.json())
          .then(data => {
            this.jugadores = data.filter(jugador => jugador.team === nombreEquipo);
          })
          .catch(error => console.error("Error cargando jugadores:", error));
      },
  
      seleccionarJugador(jugador) {
        this.jugadorSeleccionado = jugador;
        this.nuevosGoles = 0;
      },
  
      sumarGoles() {
        if (this.jugadorSeleccionado && this.nuevosGoles > 0) {
          this.jugadorSeleccionado.scores += this.nuevosGoles;
  
          fetch(`http://localhost:3000/players/${this.jugadorSeleccionado.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.jugadorSeleccionado)
          }).then(() => {
            this.nuevosGoles = 0;
          });
        }
      },
  
      eliminarJugador() {
        if (this.jugadorSeleccionado) {
          fetch(`http://localhost:3000/players/${this.jugadorSeleccionado.id}`, {
            method: "DELETE"
          }).then(() => {

            const index = this.jugadores.findIndex(jugador => jugador.id === this.jugadorSeleccionado.id);
            if (index !== -1) {
              this.jugadores.splice(index, 1);
              this.jugadorSeleccionado = null;
            }
          });
        }
      }
    },
    created() {
      this.cargarEquipos();
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    padding: 20px;
    width: 90%;
    margin: 0 auto;
  }
  
  .jugadores-container {
    display: flex;
    width: 100%;
  }
  
  .equipos {
    width: 55%;
    height: 80vh;
    overflow-y: auto;
    border-right: 3px solid #ff4b44;
    padding-right: 20px;
    padding-left: 10px;
  }
  
  .equipos ul {
    list-style: none;
    padding: 0;
  }
  
  .equipos li {
    cursor: pointer;
    margin: 10px 0;
    font-size: 16px;
    padding: 8px;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  .equipos li.seleccionado {
    font-weight: bold;
    color: #ff4b44;
  }
  
  .equipos li:hover {
    background-color: #f0f0f0;
  }
  
  .detalle-jugadores {
    width: 40%;
    padding-left: 20px;
    height: 80vh;
    overflow-y: auto;
    padding-top: 20px;
  }
  
  .detalle-jugadores ul {
    list-style: none;
    padding: 0;
  }
  
  .detalle-jugadores li {
    cursor: pointer;
    margin: 5px 0;
    font-size: 16px;
    padding: 5px;
    border-radius: 5px;
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #ff4b44;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #d93d38;
  }
  
  input {
    padding: 5px;
    margin-top: 5px;
    margin-right: 10px;
    width: 100px;
    border-radius: 5px;
    border: 1px solid #ff4b44;
  }
  </style>
  