<script setup>
import { onMounted } from "vue"
import { useStore } from "../stores/store"
import { storeToRefs } from "pinia"
import MovieCard from "../components/MovieCard.vue"

const { fetchPopularMovies } = useStore()
const { movies, loading, moviesPagination } = storeToRefs(useStore())

onMounted(() => {
  fetchPopularMovies()
})
</script>

<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <p style="font-size: 28px;">
          Content is loading ...
        </p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h1>Popular Movies</h1>
      </v-col>

      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        sm="6"
        md="3"
        class="mb-2"
      >
        <movie-card :movie="movie" />
      </v-col>

      <div class="w-100">
        <v-pagination 
          v-model="moviesPagination.page" 
          :length="moviesPagination.pages" 
          total-visible="5"
          @update:modelValue="fetchPopularMovies"
        ></v-pagination>
      </div>
    </v-row>
  </v-container>
</template>
