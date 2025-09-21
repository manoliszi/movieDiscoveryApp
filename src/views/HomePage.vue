<script setup>
import { onMounted } from "vue"
import { useStore } from "../stores/store"
import { storeToRefs } from "pinia"
import MovieCard from "../components/MovieCard.vue"

const { fetchPopularMovies } = useStore()
const { movies } = storeToRefs(useStore())

onMounted(() => {
  fetchPopularMovies()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Popular Movies</h1>
      </v-col>

      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        sm="6"
        md="3"
      >
        <movie-card :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>
