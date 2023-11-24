import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Oruga from '@oruga-ui/oruga-next';

import { bootstrapConfig} from '@oruga-ui/theme-bootstrap';
import '@oruga-ui/theme-bootstrap/dist/bootstrap.css';
import '@mdi/font/css/materialdesignicons.min.css';

import "bootstrap"
// import VueApexCharts from 'vue3-apexcharts';


const app = createApp(App)

app.use(router).use(Oruga, bootstrapConfig)

app.mount('#app')
