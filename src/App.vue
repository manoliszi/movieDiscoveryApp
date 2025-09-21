<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goHome = () => router.push('/')
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title @click="goHome" class="cursor-pointer">Movies ~ Series</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/series">Series</v-btn>
      <v-btn text to="/actors">Actors</v-btn>
      <v-btn text to="/watchlist">Watchlist</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
