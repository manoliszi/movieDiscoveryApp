<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "../stores/store"
import { storeToRefs } from 'pinia'

const { fetchMovieDetails } = useStore()
const { moviesDetails } = storeToRefs(useStore())
const route = useRoute()

const movieId = ref(null)
const chipColors = ['secondary', 'info', 'warning']

onMounted(() => {
  movieId.value = route.params.id
  fetchMovieDetails(movieId.value)
})

const title = computed(() => {
  let t = moviesDetails.value[movieId.value]?.title
  let ot = moviesDetails.value[movieId.value]?.original_title
  if (t !== ot) {
    t = t + ' (' + ot + ')'
    return t 
  }
  return t
})

const genresWithColors = computed(() => {
  const genres = moviesDetails.value[movieId.value]?.genres || []
  return genres.map((genre, index) => ({
    ...genre,
    color: chipColors[index % chipColors.length], // cycle through colors
  }))
})

const gross = computed(() => {
  return Number(moviesDetails.value[movieId.value]?.revenue) - Number(moviesDetails.value[movieId.value]?.budget)
})
</script>

<template>
  <v-container>
    <v-row v-if="movieId && moviesDetails[movieId]">
        <v-col cols="12" md="6">
          <v-img
              v-if="movieId && moviesDetails[movieId]"
              :src="`https://image.tmdb.org/t/p/w500${moviesDetails[movieId].poster_path}`"
              height="600px"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="mb-2">{{ title }}</h1>
          <div class="d-flex align-center ga-2 mb-2">
            {{ moviesDetails[movieId]?.release_date }}
            <v-divider vertical :thickness="2" class="border-opacity-100" color="primary" />
            <div>
              {{ moviesDetails[movieId]?.runtime + ' minutes' }}
            </div>
            <v-divider vertical :thickness="2" class="border-opacity-100" color="primary" />
            <v-chip :color="(moviesDetails[movieId]?.status || '').toLowerCase() === 'released' ? 'success' : 'error'" variant="elevated">
              {{ moviesDetails[movieId]?.status }}
            </v-chip>
            <v-divider vertical :thickness="2" class="border-opacity-100" color="primary" />
            <div class="d-flex align-center">
              <v-icon icon="mdi-star" color="primary" size="x-large" />
              <div class="ml-2 d-flex flex-column">
                <span>{{ moviesDetails[movieId]?.vote_average + ' / 10' }}</span>
                <span style="font-size: 10px">{{ '(' + moviesDetails[movieId]?.vote_count + ')' }}</span>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <v-card class="pa-2">
              <v-card-text>
                <v-row>
                  <v-col cols="3">
                    Budget: 
                  </v-col>
                  <v-col cols="9">
                    {{ moviesDetails[movieId]?.budget }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    Revenue: 
                  </v-col>
                  <v-col cols="9">
                    {{ moviesDetails[movieId]?.revenue }}
                  </v-col>
                </v-row>    
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="9" class="d-flex">
                    <span class="text-h5">{{ gross }}</span>
                    <v-icon icon="mdi-currency-usd" :color="gross > 0 ? 'success' : 'error'" size="x-large" />
                    <v-icon icon="mdi-currency-usd" :color="gross > 0 ? 'success' : 'error'" size="x-large" />
                    <v-icon icon="mdi-currency-usd" :color="gross > 0 ? 'success' : 'error'" size="x-large" />
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </div>
          <div class="d-flex ga-2 align-center mb-2">
            <div v-for="genre in genresWithColors" :key="genre.id">
              <v-chip :color="genre.color" variant="elevated">
                {{ genre.name }}
              </v-chip>
            </div>
          </div>
          <v-switch readonly label="Adult content" hide-details inset class="no-pointer mb-2" />
          <p class="mb-2">
            {{ moviesDetails[movieId]?.overview }}
          </p>
        </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <p style="font-size: 28px;">
          Content is loading ...
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.no-pointer {
  cursor: default !important;
}

.no-pointer * {
  cursor: default !important;
}
</style>