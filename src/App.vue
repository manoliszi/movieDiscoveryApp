<script setup>
	import AppButton from './components/AppButton.vue'
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
			<app-button variant="text" text="Movies" to="/" color="none" />
			<app-button variant="text" text="Series" to="/series" color="none" />
			<app-button variant="text" text="Actors" to="/actors" color="none" />
			<app-button variant="text" text="Watchlist" to="/watchlist" color="none" />
			<app-button variant="text" text="About" to="/about" color="none" />
		</v-app-bar>

    <!-- Main Content -->
    <v-main>
		<transition name="zoom-fade" mode="out-in">
			<router-view />
		</transition>
    </v-main>
  </v-app>
</template>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: all 0.3s ease;
}

.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.zoom-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.zoom-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>