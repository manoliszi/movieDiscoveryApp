import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const BASE_URL = "https://api.themoviedb.org/3"

export const useStore = defineStore('store', () => {
    const movies = ref([])
    const moviesPagination = ref({
        page: 1,
        pages: 0
    })
    const loading = ref(false)
    const moviesDetails = ref({})

    const fetchPopularMovies = async() => {
        loading.value = true
        try {
            console.log('moviesPagination.value.page:', moviesPagination.value.page)
            const res = await fetch(`${BASE_URL}/movie/popular?page=${moviesPagination.value.page}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            })

            if (!res.ok) throw new Error("Failed to fetch movies: " + res.statusText)

            const data = await res.json()
            movies.value = data.results
            moviesPagination.value.pages = data.total_pages
        } finally {
            loading.value = false
        }
    }

    const fetchMovieDetails = async(id) => {
        loading.value = true
        try {
            if (moviesDetails.value[id]) {
                return 
            }
            const res = await fetch(
                `${BASE_URL}/movie/${id}?language=en-US&api_key=${API_KEY}`,
                {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
                }
            )
            if (!res.ok) throw new Error("Failed to fetch movie: " + res.statusText)

            moviesDetails.value[id] = await res.json()
        } finally {
            loading.value = false
        }
    }

    return {
        movies,
        loading,
        moviesDetails,
        moviesPagination,

        fetchPopularMovies,
        fetchMovieDetails
    }
})
