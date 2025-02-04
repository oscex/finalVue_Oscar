import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import VistaClasificacion from '../views/VistaClasificacion.vue'
import VistaEliminarJugador from '../views/VistaEliminarJugador.vue'
import VistaEquipos from '../views/VistaEquipos.vue'
import VistaJornadas from '../views/VistaJornadas.vue'
import VistaJugadores from '../views/VistaJugadores.vue'
import VistaNuevoJugador from '../views/VistaNuevoJugador.vue'
import VistaNuevoPartido from '../views/VistaNuevoPartido.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/VistaClasificacion',
    name: 'VistaClasificacion',
    component: VistaClasificacion
  },
  {
    path: '/VistaEliminarJugador',
    name: 'VistaEliminarJugador',
    component: VistaEliminarJugador
  },
  {
    path: '/VistaEquipos',
    name: 'VistaEquipos',
    component: VistaEquipos
  },
  {
    path: '/VistaJornadas',
    name: 'VistaJornadas',
    component: VistaJornadas
  },
  {
    path: '/VistaJugadores',
    name: 'VistaJugadores',
    component: VistaJugadores
  },
  {
    path: '/VistaNuevoJugador',
    name: 'VistaNuevoJugador',
    component: VistaNuevoJugador
  },
  {
    path: '/VistaNuevoPartido',
    name: 'VistaNuevoPartido',
    component: VistaNuevoPartido
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
