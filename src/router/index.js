import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Inicio from '../views/VistaClasificacion.vue'
import Inicio from '../views/VistaEliminarJugador.vue'
import Inicio from '../views/VistaEquipos.vue'
import Inicio from '../views/VistaJornadas.vue'
import Inicio from '../views/VistaJugadores.vue'
import Inicio from '../views/VistaNuevoJugador.vue'
import Inicio from '../views/VistaNuevoPartido.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/VistaClasificacion',
    name: 'VistaClasificacion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/VistaClasificacion.vue')
  },
  {
    path: '/VistaEliminarJugador',
    name: 'VistaEliminarJugador',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/VistaEquipos',
    name: 'VistaEquipos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/VistaJornadas',
    name: 'VistaJornadas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/VistaClasificacion',
    name: 'VistaClasificacion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/VistaNuevoJugador',
    name: 'VistaNuevoJugador',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/VistaNuevoPartdo',
    name: 'VistaNuevoPartdo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
