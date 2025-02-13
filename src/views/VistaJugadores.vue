<template>
            <h2>Equipos</h2>
    <div class="container">
      <div class="jugadores-container">
        <!-- Sección de Equipos (izquierda) -->
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
  
        <!-- Sección de Detalle de Jugadores (derecha) -->
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
        equipos: [], // Lista de equipos
        equipoSeleccionado: null, // Equipo seleccionado
        jugadores: [], // Jugadores del equipo seleccionado
        jugadorSeleccionado: null, // Jugador seleccionado
        nuevosGoles: 0 // Goles que se sumarán al jugador
      };
    },
    methods: {
      // Cargar equipos desde el archivo bbdd.json (simulación)
      cargarEquipos() {
        fetch("http://localhost:3000/clubs")
          .then(response => response.json())
          .then(data => {
            this.equipos = data;
          })
          .catch(error => console.error("Error cargando equipos:", error));
      },
  
      // Seleccionar un equipo y cargar sus jugadores
      seleccionarEquipo(equipo) {
        // Limpiar la selección de jugador al cambiar de equipo
        this.jugadorSeleccionado = null;
        this.equipoSeleccionado = equipo;
        this.cargarJugadores(equipo.name);
      },
  
      // Cargar jugadores de un equipo
      cargarJugadores(nombreEquipo) {
        fetch("http://localhost:3000/players")
          .then(response => response.json())
          .then(data => {
            this.jugadores = data.filter(jugador => jugador.team === nombreEquipo);
          })
          .catch(error => console.error("Error cargando jugadores:", error));
      },
  
      // Seleccionar un jugador y mostrar sus detalles
      seleccionarJugador(jugador) {
        this.jugadorSeleccionado = jugador;
        this.nuevosGoles = 0; // Reiniciar los goles
      },
  
      // Sumar goles al jugador
      sumarGoles() {
        if (this.jugadorSeleccionado && this.nuevosGoles > 0) {
          this.jugadorSeleccionado.scores += this.nuevosGoles;
  
          // Actualizar el jugador en la base de datos
          fetch(`http://localhost:3000/players/${this.jugadorSeleccionado.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.jugadorSeleccionado)
          }).then(() => {
            this.nuevosGoles = 0; // Limpiar el campo de goles
          });
        }
      },
  
      // Eliminar un jugador de la base de datos
      eliminarJugador() {
        if (this.jugadorSeleccionado) {
          // Eliminar el jugador en el archivo bbdd.json
          fetch(`http://localhost:3000/players/${this.jugadorSeleccionado.id}`, {
            method: "DELETE"
          }).then(() => {
            // Eliminar el jugador de la lista local
            const index = this.jugadores.findIndex(jugador => jugador.id === this.jugadorSeleccionado.id);
            if (index !== -1) {
              this.jugadores.splice(index, 1);
              this.jugadorSeleccionado = null; // Limpiar la selección del jugador
            }
          });
        }
      }
    },
    created() {
      this.cargarEquipos(); // Cargar los equipos al crear el componente
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    padding: 20px;
    width: 90%; /* Hacer el contenedor más ancho en la pantalla */
    margin: 0 auto;
  }
  
  .jugadores-container {
    display: flex;
    width: 100%;
  }
  
  .equipos {
    width: 55%; /* Sección de equipos ahora ocupa el 55% del ancho */
    height: 80vh; /* Limitar la altura de la sección de equipos */
    overflow-y: auto; /* Permitimos desplazamiento si hay muchos equipos */
    border-right: 3px solid #ff4b44; /* Borde rojo grueso para separar */
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
    color: #ff4b44; /* Rojo para los equipos seleccionados */
  }
  
  .equipos li:hover {
    background-color: #f0f0f0;
  }
  
  .detalle-jugadores {
    width: 40%; /* La sección de jugadores ocupa el 40% del ancho */
    padding-left: 20px;
    height: 80vh; /* Limitar la altura de la sección de jugadores */
    overflow-y: auto; /* Permitimos el desplazamiento si es necesario */
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
    background-color: #d93d38; /* Color de hover para los botones */
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
  