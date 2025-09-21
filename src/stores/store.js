import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const BASE_URL = "https://api.themoviedb.org/3"

export const useStore = defineStore('store', () => {
    const movies = ref([])
    const loading = ref(false)

    const fetchPopularMovies = async() => {
        loading.value = true
        try {
            const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            })

            if (!res.ok) throw new Error("Failed to fetch movies: " + res.statusText)

            const data = await res.json()
            movies.value = data.results
        } finally {
            loading.value = false
        }
    }

    return {
        movies,
        loading,

        fetchPopularMovies
    }
})
