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

// Import mdi font
import '@mdi/font/css/materialdesignicons.css'

// router
import router from './router/router' 

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false, // set true for dark mode
        colors: {
          primary: '#FFD700',
          secondary: '#531c7bff',
          accent: '#FFB347',
          background: '#F5F5F5',
          surface: '#FFFFFF',
          error: '#F44336',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
})

const app = createApp(App)

// order doesn’t really matter, but Pinia MUST be installed before you use stores
app.use(createPinia()) 
app.use(router)
app.use(vuetify)

app.mount('#app')
