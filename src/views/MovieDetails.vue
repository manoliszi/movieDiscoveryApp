<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "../stores/store"
import { storeToRefs } from 'pinia'

const { fetchMovieDetails } = useStore()
const { moviesDetails } = storeToRefs(useStore())
const route = useRoute()

const movieId = ref(null)

onMounted(() => {
  movieId.value = route.params.id
  fetchMovieDetails(movieId.value)
})
</script>

<template>
  <v-container>
    <v-row>
        <v-spacer />
        <v-col cols="12" md="4">
        <v-img
            v-if="movieId && moviesDetails[movieId]"
            :src="`https://image.tmdb.org/t/p/w500${moviesDetails[movieId].poster_path}`"
            height="600px"
        />
        </v-col>
        <v-spacer />
    </v-row>
    <v-row v-if="movieId && moviesDetails[movieId]">
        Adult: {{ moviesDetails[movieId].adult }}
        budget: {{ moviesDetails[movieId].budget }}
        genres: {{ moviesDetails[movieId].genres }}
        original_title: {{ moviesDetails[movieId].original_title }}
        overview: {{ moviesDetails[movieId].overview }}
        popularity: {{ moviesDetails[movieId].popularity }}
        release_date: {{ moviesDetails[movieId].release_date }}
        revenue: {{ moviesDetails[movieId].revenue }}
        runtime: {{ moviesDetails[movieId].runtime }}
        status: {{ moviesDetails[movieId].status }}
        title: {{ moviesDetails[movieId].title }}
        vote_average: {{ moviesDetails[movieId].vote_average }}
        vote_count: {{ moviesDetails[movieId].vote_count }}
    </v-row>
  </v-container>
</template>
