// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Pinia
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// order doesn’t really matter, but Pinia MUST be installed before you use stores
app.use(createPinia()) 
app.use(vuetify)

app.mount('#app')
