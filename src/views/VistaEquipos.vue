<template>
    <div class="container">
      <h1>Equipos</h1>
      <ul class="equipos">
        <li 
          v-for="equipo in equipos" 
          :key="equipo.id" 
          @click="seleccionarEquipo(equipo)"
          :class="{ seleccionado: equipo.id === equipoSeleccionado?.id }"
        >
          <h2>{{ equipo.name }}</h2>
          <ul class="jugadores">
            <li v-for="jugador in equipo.players" :key="jugador.id">
              {{ jugador.name }}
            </li>
          </ul>
        </li>
      </ul>
      
      <button 
        @click="mostrarNuevoJugador" 
        :disabled="!equipoSeleccionado"
      >
        Nuevo Jugador
      </button>
  
      <NuevoJugador 
        v-if="mostrarFormulario" 
        :equipo="equipoSeleccionado" 
        @jugadorCreado="actualizarListaJugadores"
      />
    </div>
  </template>
  
  <script>
  import NuevoJugador from "../components/formularioNuevoJugador.vue";
  
  export default {
    components: { NuevoJugador },
    data() {
      return {
        equipos: [],
        equipoSeleccionado: null,
        mostrarFormulario: false
      };
    },
    methods: {
      async cargarEquipos() {
        try {
          const response = await fetch("http://localhost:3000/clubs");
          const data = await response.json();
          console.log(data); // Verifica los datos que recibes
          this.equipos = data.map(equipo => ({
            ...equipo,
            players: equipo.players || []
          }));
        } catch (error) {
          console.error("Error cargando equipos:", error);
        }
      },
      seleccionarEquipo(equipo) {
        this.equipoSeleccionado = equipo;
        this.mostrarFormulario = false;
      },
      mostrarNuevoJugador() {
        this.mostrarFormulario = true;
      },
      actualizarListaJugadores(nuevoJugador) {
        const equipoIndex = this.equipos.findIndex(e => e.id === this.equipoSeleccionado.id);
        if (equipoIndex !== -1) {
          this.equipos[equipoIndex].players.push(nuevoJugador);
          // Aseguramos que Vue detecte el cambio correctamente
          this.equipoSeleccionado = { ...this.equipos[equipoIndex] };
        }
        this.mostrarFormulario = false;
      }
    },
    created() {
      this.cargarEquipos();
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .equipos {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .equipos li {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background: #fff;
  }
  
  .equipos li:hover {
    background-color: #f8f9fa;
  }
  
  .equipos li.seleccionado {
    background-color: #007bff;
    color: white;
  }
  
  .jugadores {
    list-style: none;
    padding-left: 0;
    margin-top: 10px;
  }
  
  .jugadores li {
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 15px;
    border: none;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #218838;
  }
  </style>
  