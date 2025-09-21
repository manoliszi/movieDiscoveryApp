<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['movie'])

const router = useRouter()

function goToMovie(movieId) {
  router.push(`/movie/${movieId}`)
}
</script>

<template>
  <v-card
    class="elevation-0 pa-2"
    @click="goToMovie(movie.id)"
    hover
  >
    <div class="poster-wrapper">
      <v-img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        class="poster"
        height="400px"
        cover
      />
    </div>
    <v-card-title>{{ movie.title }}</v-card-title>
    <v-card-subtitle>
      ⭐ {{ movie.vote_average }} | 📅 {{ movie.release_date }}
    </v-card-subtitle>
  </v-card>
</template>

<style scoped>
.poster-wrapper {
  border-radius: 12px;
  overflow: hidden;
}
</style>