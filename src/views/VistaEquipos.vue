<template>
    <div class="container">
      <h1>Equipos</h1>
      
      <div class="equipos-lista">
        <div 
          v-for="equipo in equipos" 
          :key="equipo.id" 
          class="equipo-card"
          :class="{ seleccionado: equipo.id === equipoSeleccionado?.id }"
          @click="seleccionarEquipo(equipo)"
        >
          <div class="equipo-header">
            <h2>{{ equipo.name }}</h2>
          </div>
          
          <div v-if="equipo.players && equipo.players.length > 0" class="jugadores-lista">
            <div v-for="jugador in equipo.players" :key="jugador.id" class="jugador">
              <span>{{ jugador.name }}</span>
              <span class="goles">{{ jugador.goals }} goles</span>
            </div>
          </div>
          <div v-else class="sin-jugadores">
            No hay jugadores registrados
          </div>
        </div>
      </div>
  
      <button 
        @click="mostrarNuevoJugador" 
        :disabled="!equipoSeleccionado"
        class="btn-primario"
      >
        Nuevo Jugador
      </button>
  
      <NuevoJugador 
        v-if="mostrarFormulario" 
        :equipoFijo="equipoSeleccionado"
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
      async cargarDatos() {
        try {
          const [equiposRes, jugadoresRes] = await Promise.all([
            fetch("http://localhost:3000/clubs"),
            fetch("http://localhost:3000/players")
          ]);
          
          const equipos = await equiposRes.json();
          const jugadores = await jugadoresRes.json();
  
          // Asignar jugadores a sus equipos
          this.equipos = equipos.map(equipo => ({
            ...equipo,
            players: jugadores.filter(j => j.team === equipo.name)
          }));
          
        } catch (error) {
          console.error("Error cargando datos:", error);
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
          this.$set(this.equipos[equipoIndex].players, this.equipos[equipoIndex].players.length, nuevoJugador);
        }
        this.mostrarFormulario = false;
      }
    },
    async created() {
      await this.cargarDatos();
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #ff4b44;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .equipos-lista {
    display: grid;
    gap: 15px;
  }
  
  .equipo-card {
    background: #fff;
    border: 1px solid #ffeceb;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .equipo-card.seleccionado {
    border-color: #ff4b44;
    background: #fff5f5;
  }
  
  .equipo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .equipo-header h2 {
    margin: 0;
    color: #333;
  }
  
  .puntos {
    background: #ff4b44;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
  }
  
  .jugadores-lista {
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
  
  .jugador {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f8f8f8;
  }
  
  .jugador:last-child {
    border-bottom: none;
  }
  
  .goles {
    color: #ff4b44;
    font-weight: bold;
  }
  
  .sin-jugadores {
    color: #666;
    font-style: italic;
    padding: 10px;
    text-align: center;
  }
  
  .btn-primario {
    display: block;
    width: 100%;
    max-width: 200px;
    margin: 20px auto 0;
    padding: 12px;
    background: #ff4b44;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-primario:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .btn-primario:hover:not(:disabled) {
    background: #d93d38;
  }
  </style>