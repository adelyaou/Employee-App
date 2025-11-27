import { createApp, ref, provide } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import './style.css';

export const authToken = ref(localStorage.getItem('token'));

const app = createApp(App);
app.provide('authToken', authToken);
app.use(router).mount('#app');
