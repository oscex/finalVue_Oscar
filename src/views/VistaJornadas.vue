<template>
  <div class="container">
    <h1>Jornadas</h1>

    <select v-model="jornadaSeleccionada" @change="cargarPartidos">
      <option value="" disabled>Selecciona una jornada</option>
      <option v-for="jornada in jornadas" :key="jornada.round" :value="jornada">
          {{ jornada.round }} - {{ jornada.date }}
      </option>
    </select>

    <div v-if="partidos.length > 0" class="partidos">
      <div v-for="partido in partidos" :key="partido.id" class="partido">
        <div class="equipos">
          <span>{{ partido.team1 }}</span>
          <span>vs</span>
          <span>{{ partido.team2 }}</span>
        </div>

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
      jornadas: [],
      partidos: [],
      jornadaSeleccionada: null,
      todosPartidos: [],
      clubs: []
    };
  },
  methods: {
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

    async guardarResultado(partido) {
      try {
        const score = [partido.goles1, partido.goles2];

        await fetch(`http://localhost:3000/matches/${partido.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ score })
        });

        await this.actualizarPuntos(partido.team1, partido.team2, score);

        const partidoActualizado = this.todosPartidos.find(p => p.id === partido.id);
        if (partidoActualizado) {
          partidoActualizado.score = score;
        }

        this.cargarPartidos();
      } catch (error) {
        console.error("Error guardando resultado:", error);
      }
    },

    async actualizarPuntos(team1Name, team2Name, score) {
      let puntosTeam1 = 0;
      let puntosTeam2 = 0;
      
      if (score[0] > score[1]) {
        puntosTeam1 = 3;
      } else if (score[0] < score[1]) {
        puntosTeam2 = 3;
      } else {
        puntosTeam1 = 1;
        puntosTeam2 = 1;
      }
      
      const team1 = this.clubs.find(c => c.name === team1Name);
      const team2 = this.clubs.find(c => c.name === team2Name);
      
      if (!team1 || !team2) {
        console.error("Error: No se encontraron los equipos en la base de datos");
        return;
      }
      
      try {
        await fetch(`http://localhost:3000/clubs/${team1.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ points: team1.points + puntosTeam1 })
        });

        await fetch(`http://localhost:3000/clubs/${team2.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ points: team2.points + puntosTeam2 })
        });
      } catch (error) {
        console.error("Error actualizando puntos:", error);
      }
    },

    async cargarDatos() {
      try {
        const matchesResponse = await fetch("http://localhost:3000/matches");
        this.todosPartidos = await matchesResponse.json();

        const clubsResponse = await fetch("http://localhost:3000/clubs");
        this.clubs = await clubsResponse.json();

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
        console.error("Error cargando datos:", error);
      }
    }
  },
  created() {
    this.cargarDatos();
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