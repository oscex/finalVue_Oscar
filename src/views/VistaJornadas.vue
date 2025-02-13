<template>
  <div class="container">
    <h1>Jornadas</h1>

    <!-- Selector de jornada -->
    <select v-model="jornadaSeleccionada" @change="cargarPartidos">
      <option value="" disabled>Selecciona una jornada</option>
      <option v-for="jornada in jornadas" :key="jornada.round" :value="jornada">
          {{ jornada.round }} - {{ jornada.date }}
      </option>
    </select>

    <!-- Lista de partidos -->
    <div v-if="partidos.length > 0" class="partidos">
      <div v-for="partido in partidos" :key="partido.id" class="partido">
        <div class="equipos">
          <span>{{ partido.team1 }}</span>
          <span>vs</span>
          <span>{{ partido.team2 }}</span>
        </div>

        <!-- Resultado o inputs para introducir resultado -->
        <div v-if="partido.score" class="resultado">
          {{ partido.score[0] }} - {{ partido.score[1] }}
        </div>
        <div v-else class="inputs">
          <input type="number" v-model.number="partido.goles1" min="0">
          <span>-</span>
          <input type="number" v-model.number="partido.goles2" min="0">
          <button @click="guardarResultado(partido)">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jornadas: [], // Lista de jornadas disponibles con fechas
      partidos: [], // Partidos de la jornada seleccionada
      jornadaSeleccionada: null, // Jornada seleccionada (objeto con round y date)
      todosPartidos: [] // Todos los partidos cargados
    };
  },
  methods: {
    // Carga los partidos de la jornada seleccionada
    cargarPartidos() {
      if (!this.jornadaSeleccionada) return;
      
      this.partidos = this.todosPartidos
        .filter(p => p.round === this.jornadaSeleccionada.round)
        .map(p => ({
          ...p,
          goles1: p.score ? p.score[0] : 0,
          goles2: p.score ? p.score[1] : 0
        }));
    },

    // Guarda el resultado de un partido
    async guardarResultado(partido) {
      try {
        // Actualiza el partido en la base de datos
        await fetch(`http://localhost:3000/matches/${partido.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            score: [partido.goles1, partido.goles2]
          })
        });

        // Actualiza el estado local
        const partidoActualizado = this.todosPartidos.find(p => p.id === partido.id);
        if (partidoActualizado) {
          partidoActualizado.score = [partido.goles1, partido.goles2];
        }

        // Recarga los partidos para mostrar el resultado actualizado
        this.cargarPartidos();
      } catch (error) {
        console.error("Error guardando resultado:", error);
      }
    },

    // Carga todos los partidos al iniciar
    async cargarTodosPartidos() {
      try {
        const response = await fetch("http://localhost:3000/matches");
        this.todosPartidos = await response.json();

        // Agrupar jornadas por número y tomar la primera fecha de cada jornada
        const jornadasMap = new Map();
        this.todosPartidos.forEach(p => {
          if (!jornadasMap.has(p.round)) {
            jornadasMap.set(p.round, {
              round: p.round,
              date: p.date
            });
          }
        });
        
        this.jornadas = Array.from(jornadasMap.values())
          .sort((a, b) => a.round - b.round);
          
      } catch (error) {
        console.error("Error cargando partidos:", error);
      }
    }
  },
  created() {
    this.cargarTodosPartidos();
  }
};
</script>
<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
}

.partidos {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.partido {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.equipos {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.resultado {
  text-align: center;
  font-weight: bold;
}

.inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  width: 50px;
  padding: 5px;
  text-align: center;
}

button {
  padding: 5px 10px;
  background: #ff4b44;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #d93d38;
}
</style>