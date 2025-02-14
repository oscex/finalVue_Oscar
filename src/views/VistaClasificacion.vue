<template>
  <div class="container">
    <h1>Clasificación</h1>
    
    <div class="clasificacion">
      <div 
        v-for="(equipo, index) in equiposOrdenados" 
        :key="equipo.name" 
        class="equipo"
        @click="equipoSeleccionado = equipoSeleccionado === equipo.name ? null : equipo.name"
      >
        <div class="equipo-header">
          <span class="posicion">{{ index + 1 }}.</span>
          <span class="nombre">{{ equipo.name }}</span>
          <span class="puntos">{{ equipo.points }} pts</span>
        </div>

        <transition name="slide">
          <div v-if="equipoSeleccionado === equipo.name" class="detalle-jugadores">
            <h3>Jugadores y Goles</h3>
            <div v-for="jugador in jugadoresDelEquipo(equipo.name)" :key="jugador.id" class="jugador">
              <span>{{ jugador.name }}</span>
              <span v-if="jugador.scores == 0"> Sin Goles</span>
              <span v-else>{{ jugador.scores }} goles</span>
            </div>
            <div v-if="jugadoresDelEquipo(equipo.name).length === 0" class="sin-jugadores">
              No hay jugadores registrados
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      equipos: [],
      jugadores: [],
      equipoSeleccionado: null
    };
  },
  computed: {
    equiposOrdenados() {
      return [...this.equipos].sort((a, b) => b.points - a.points);
    }
  },
  methods: {
    jugadoresDelEquipo(nombreEquipo) {
      return this.jugadores.filter(jugador => 
        jugador.team && 
        jugador.team.trim().toLowerCase() === nombreEquipo.trim().toLowerCase()
      );
    },
    async cargarEquipos() {
      try {
        const response = await fetch("http://localhost:3000/clubs");
        this.equipos = await response.json();
      } catch (error) {
        console.error("Error cargando equipos:", error);
      }
    },
    async cargarJugadores() {
      try {
        const response = await fetch("http://localhost:3000/players");
        this.jugadores = await response.json();
      } catch (error) {
        console.error("Error cargando jugadores:", error);
      }
    }
  },
  async created() {
    await this.cargarEquipos();
    await this.cargarJugadores();
  }
};
</script>
  <style>
    body {
    font-family: Arial, sans-serif;
    background-color: #ffeceb;
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  h1 {
    color: #ff4b44;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .clasificacion {
    width: 100%;
  }
  
  .equipo {
    background: white;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .equipo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  
  .equipo:hover {
    transform: translateY(-2px);
  }
  
  .posicion {
    width: 40px;
    font-weight: bold;
  }
  
  .nombre {
    flex-grow: 1;
    margin-left: 15px;
    text-align: left;
  }
  
  .puntos {
    width: 80px;
    text-align: right;
    font-weight: bold;
    color: #ff4b44;
  }
  
  .detalle-jugadores {
    padding: 15px;
    background: #f8f8f8;
    border-top: 1px solid #eee;
  }
  
  .jugador {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  
  .jugador:last-child {
    border-bottom: none;
  }
  
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  ::-webkit-scrollbar {
    display: none;
}
  .sin-jugadores {
    color: #666;
    font-style: italic;
    padding: 10px;
  }
  </style>