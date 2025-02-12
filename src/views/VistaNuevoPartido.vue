<template>
    <form class="container">
        <h1>Crear Partido</h1>

        <label for="Jornada">Jornada:</label>
        <input type="number" v-model="jornadaSeleccionada" :max="38">

        <label for="fecha">Fecha:</label>
        <input type="date" v-model="fechaSeleccionada">

        <label for="equipo1">Equipo 1:</label>
        <select name="equipo" id="equipo1" v-model="equipoSeleccionado1">
            <option v-for="equipo in teams1" :key="equipo.name">{{ equipo.name }}</option>
        </select>

        <label for="equipo2">Equipo 2:</label>
        <select name="equipo" id="equipo2" v-model="equipoSeleccionado2">
            <option v-for="equipo in teams2" :key="equipo.name">{{ equipo.name }}</option>
        </select>

        <div class="radio-group">
            <label>
                <input type="radio" id="partidoJugadoSi" name="partidoJugado" value="si" v-model="partidoJugado">
                Sí
            </label>
            <label>
                <input type="radio" id="partidoJugadoNo" name="partidoJugado" value="no" v-model="partidoJugado">
                No
            </label>
        </div>

        <div v-if="partidoJugado === 'si'">
            <label for="gol1">Goles {{ equipoSeleccionado1 }}</label>
            <input type="number" v-model="golesEquipo1" required min="0">

            <label for="gol2">Goles {{ equipoSeleccionado2 }}</label>
            <input type="number" v-model="golesEquipo2" required min="0">
        </div>

        <button type="submit" @click.prevent="cargarJornada">Enviar</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            equipos: [],
            partidos: [],
            equipoSeleccionado1: "",
            equipoSeleccionado2: "",
            jornadaSeleccionada: "",
            fechaSeleccionada: "",
            partidoJugado: "",
            golesEquipo1: "",
            golesEquipo2: "",
        };
    },
    methods: {
        cargarPartidos() {
        fetch("http://localhost:3000/matches")
            .then(response => response.json())
            .then(data => {
                this.partidos = data;
                console.log(this.partidos);
            })
            .catch(error => console.error("Error al cargar partidos:", error));
    },
    cargarJornada() {

        if (!(this.equipoSeleccionado1 === "" || this.equipoSeleccionado2 === "" || this.jornadaSeleccionada === "" || this.fechaSeleccionada === "")) {

            const jornadaAComprobar = "Jornada " + this.jornadaSeleccionada;


            const partidoEquipo1 = this.partidos.some(match => 
                match.round === jornadaAComprobar && 
                (match.team1 === this.equipoSeleccionado1 || match.team2 === this.equipoSeleccionado1)
            );

            const partidoEquipo2 = this.partidos.some(match => 
                match.round === jornadaAComprobar && 
                (match.team1 === this.equipoSeleccionado2 || match.team2 === this.equipoSeleccionado2)
            );

            if (partidoEquipo1 || partidoEquipo2) {
                alert("Uno de los equipos ya ha jugado en esta jornada.");
                return;
            }


            let datosJornada = {
                round: "Jornada " + this.jornadaSeleccionada,
                date: this.fechaSeleccionada,
                team1: this.equipoSeleccionado1,
                team2: this.equipoSeleccionado2,
            };

            if (this.partidoJugado === 'si') {
                datosJornada.score = [
                    this.golesEquipo1,
                    this.golesEquipo2
                ];
            }

            fetch("http://localhost:3000/matches", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosJornada),
            })
                .then(response => {
                    if (response.ok) {
                        this.reiniciarDatos();
                    }
                })
                .catch(error => console.error("Error de conexión:", error));
        } else {
            alert("Ha dejado campos vacíos");
        }
    },

        reiniciarDatos() {
            this.jornadaSeleccionada = "";
            this.fechaSeleccionada = "";
            this.equipoSeleccionado1 = "";
            this.equipoSeleccionado2 = "";
            this.partidoJugado = "";
            this.golesEquipo1 = "";
            this.golesEquipo2 = "";
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
                    this.equipos = data;
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    },
    created() {
        this.cargarEquipos();
        this.cargarPartidos();
    },
    computed: {
        teams1() {
            return this.equipos.filter(equipo => equipo.name !== this.equipoSeleccionado2);
        },
        teams2() {
            return this.equipos.filter(equipo => equipo.name !== this.equipoSeleccionado1);
        },
    },
};
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

input,
select,
button {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ff4b44;
    border-radius: 5px;
    font-size: 16px;
}

input:focus,
select:focus {
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

.radio-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.radio-group label {
    display: flex;
    align-items: center;
    font-weight: normal;
}

.radio-group input[type="radio"] {}
</style>