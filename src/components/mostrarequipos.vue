<template>
<div v-for="equipo in equipos">
    <p>{{equipo.name}}</p>
    <p v-for="jugador in jugadores">{{jugador.name}}</p>
</div>
</template>
<script>
export default {
  data() {
    return {
      equipos: [],
      jugadores: []
    };
  },
  mounted(){
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
      fetch("http://localhost:3000/players")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        this.jugadores = data;
      })
      .catch((error) => {
        this.error = error.message;
      })
  }, methods() {

  }
};
</script>
