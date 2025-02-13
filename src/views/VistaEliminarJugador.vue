<template>
    <div class="container">
      <h2>Eliminar Jugador</h2>
  
      <!-- Primer desplegable: Equipos -->
      <label for="equipo">Seleccionar equipo:</label>
      <select v-model="equipoSeleccionado" @change="actualizarJugadores">
        <option disabled value="">Seleccione un equipo</option>
        <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">{{ equipo.name }}</option>
      </select>
  
      <!-- Segundo desplegable: Jugadores -->
      <label for="jugador">Seleccionar jugador:</label>
      <select v-model="jugadorSeleccionado" :disabled="!equipoSeleccionado">
        <option disabled value="">Seleccione un jugador</option>
        <option v-for="jugador in jugadores" :key="jugador.id" :value="jugador.id">{{ jugador.name }}</option>
      </select>
  
      <!-- Botón Eliminar -->
      <button @click="eliminarJugador" :disabled="!jugadorSeleccionado">
        Eliminar
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        equipos: [],
        jugadores: [],
        equipoSeleccionado: "",
        jugadorSeleccionado: "",
      };
    },
    methods: {
      cargarEquipos() {
        fetch("http://localhost:3000/clubs")
          .then(response => response.json())
          .then(data => this.equipos = data)
          .catch(error => console.error("Error cargando equipos:", error));
      },
      actualizarJugadores() {
        if (!this.equipoSeleccionado) {
          this.jugadores = [];
          return;
        }
        
        const equipo = this.equipos.find(e => e.id === this.equipoSeleccionado);
        if (!equipo) return;
  
        fetch(`http://localhost:3000/players?team=${encodeURIComponent(equipo.name)}`)
          .then(response => response.json())
          .then(data => {
            this.jugadores = data;
            this.jugadorSeleccionado = "";
          })
          .catch(error => console.error("Error cargando jugadores:", error));
      },
      eliminarJugador() {
        if (!this.jugadorSeleccionado) return;
  
        fetch(`http://localhost:3000/players/${this.jugadorSeleccionado}`, {
          method: "DELETE"
        })
        .then(response => {
          if (response.ok) {
            this.actualizarJugadores();
          }
        })
        .catch(error => console.error("Error eliminando jugador:", error))
        .finally(() => {
          this.jugadorSeleccionado = "";
        });
      }
    },
    created() {
      this.cargarEquipos();
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  label {
    margin-top: 10px;
    display: block;
  }
  
  select {
    margin-top: 5px;
    padding: 8px;
    width: 100%;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff4b44;
    color: white;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover {
    background-color: #d93d38;
  }
  </style>