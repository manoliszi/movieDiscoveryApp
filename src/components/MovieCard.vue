<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['movie'])

const router = useRouter()

function handleClick(movieId, event) {
  const card = event.currentTarget
  card.classList.add('zooming')

  setTimeout(() => {
    router.push(`/movie/${movieId}`)
  }, 300)
}
</script>

<template>
  <v-card
    class="movie-card elevation-0 pa-2"
    @click="handleClick(movie.id, $event)"
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
    <v-tooltip v-if="movie.title?.length > 20" :text="movie.title">
      <template #activator="{ props }">
        <v-card-title v-bind="props" class="truncate-title">
          {{ movie.title }}
        </v-card-title>
      </template>
    </v-tooltip>
    <v-card-title v-else v-bind="props" class="truncate-title">
      {{ movie.title }}
    </v-card-title>
    <v-card-subtitle class="d-flex align-center ga-2">
      <v-icon icon="mdi-star" color="primary" size="x-large" />
      {{ movie.vote_average }}
      <v-divider vertical :thickness="2" class="border-opacity-100" color="primary" />
      <v-icon icon="mdi-calendar" size="large" />
      {{ movie.release_date }}
    </v-card-subtitle>
  </v-card>
</template>

<style scoped>
.poster-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

.movie-card {
  transition: background-color 0.3s ease;
}

.movie-card:hover {
  background-color: rgb(var(--v-theme-secondary));
}

.movie-card.zooming {
  transform: scale(1.1); /* zoom in */
}
</style>