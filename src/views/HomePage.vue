<script setup>
import { onMounted } from "vue"
import { useStore } from "../stores/store"
import { storeToRefs } from "pinia"

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
        <v-card>
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            height="400px"
          />
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-card-subtitle>
            ⭐ {{ movie.vote_average }} | 📅 {{ movie.release_date }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
