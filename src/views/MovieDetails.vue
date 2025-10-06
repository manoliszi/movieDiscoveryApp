<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "../stores/store"
import { storeToRefs } from 'pinia'
import AppButton from '../components/AppButton.vue'
import MovieCard from '../components/MovieCard.vue'

const { fetchMovieDetails } = useStore()
const { moviesDetails, moviesRecommendations } = storeToRefs(useStore())
const route = useRoute()

const movieId = ref(null)
const chipColors = ['secondary', 'info', 'warning']
const recommendations = ref(false)

onMounted(() => {
  movieId.value = route.params.id
  fetchMovieDetails(movieId.value)
})

watch(
  () => route.params.id,
  (newId) => {
    movieId.value = newId
    recommendations.value = false
    fetchMovieDetails(newId)
  }
)

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

const currentPage = ref(0)
const perPage = ref(4)

const startIndex = computed(() => currentPage.value * perPage.value)
const endIndex = computed(() => startIndex.value + perPage.value)

const paginatedMovies = computed(() => {
  const all = moviesRecommendations.value[movieId.value] || []
  return all.slice(startIndex.value, endIndex.value)
})

function nextPage() {
  const total = moviesRecommendations.value[movieId.value]?.length || 0
  if (endIndex.value < total) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 0) currentPage.value--
}
</script>

<template>
  <v-container>
    <div v-if="movieId && moviesDetails[movieId] && moviesRecommendations[movieId]">
      <v-row>
          <v-col cols="12" md="6">
            <v-img
                v-if="movieId && moviesDetails[movieId]"
                :src="`https://image.tmdb.org/t/p/w500${moviesDetails[movieId].poster_path}`"
                height="600px"
            />
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column">
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
            <v-switch v-model="moviesDetails[movieId].adult" readonly label="Adult content" hide-details inset class="no-pointer mb-2" />
            <p class="mb-2">
              {{ moviesDetails[movieId]?.overview }}
            </p>
            <div class="d-flex ga-2 align-center mb-2">
              <div v-for="genre in genresWithColors" :key="genre.id">
                <v-chip :color="genre.color" variant="elevated">
                  {{ genre.name }}
                </v-chip>
              </div>
            </div>
          </v-col>
      </v-row>
      <v-row class="align-center mt-15">
        <v-col cols="1" class="d-flex justify-center">
          <app-button @click="prevPage" text="" variant="tonal" color="none" icon :disabled="currentPage === 0" class="elevation-3">
            <template #append>
              <v-icon>mdi-chevron-left</v-icon>
            </template>
          </app-button>
        </v-col>

        <v-col cols="10">
          <div class="d-flex justify-center flex-wrap ga-2">
            <movie-card
              v-for="movie in paginatedMovies"
              :key="movie.id"
              :movie="movie"
              :hide-details="true"
              style="flex: 1 1 calc(20% - 16px); min-width: 200px; max-width: 220px;"
            />
          </div>
        </v-col>

        <v-col cols="1" class="d-flex justify-center">
          <app-button @click="nextPage" text="" variant="tonal" color="none" icon :disabled="endIndex >= moviesRecommendations[movieId].length" class="elevation-3">
            <template #append>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </app-button>
        </v-col>
      </v-row>
    </div>
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <p style="font-size: 28px;">
          Content is loading ...
        </p>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="recommendations" max-width="600px">
    <v-card elevation="0">
      <v-card-title class="d-flex">
        More like this
        <v-spacer />
        <app-button variant="text" text="" color="none"  @click="recommendations = false">
          <template #append>
            <v-icon icon="mdi-close" size="large" />
          </template>
        </app-button>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="movie in moviesRecommendations[movieId]"
            :key="movie.id"
            cols="12"
            sm="6"
            class="mb-2"
          >
            <movie-card :movie="movie" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.no-pointer {
  cursor: default !important;
}

.no-pointer * {
  cursor: default !important;
}
</style>