// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Pages / Views
import HomePage from '../views/HomePage.vue'
import MovieDetails from '../views/MovieDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true,
  },
//   {
//     path: '/series',
//     name: 'Series',
//     component: SeriesPage,
//   },
//   {
//     path: '/series/:id',
//     name: 'SeriesDetails',
//     component: SeriesDetails,
//     props: true,
//   },
//   {
//     path: '/actors',
//     name: 'Actors',
//     component: ActorsPage,
//   },
//   {
//     path: '/actors/:id',
//     name: 'ActorDetails',
//     component: ActorDetails,
//     props: true,
//   },
//   {
//     path: '/search',
//     name: 'Search',
//     component: SearchPage,
//   },
//   {
//     path: '/watchlist',
//     name: 'Watchlist',
//     component: WatchlistPage,
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: AboutPage,
//   },
//   // fallback for unmatched routes
//   {
//     path: '/:pathMatch(.*)*',
//     redirect: '/',
//   },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
