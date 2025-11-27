<template>
  <div id="app">
    <div v-if="authToken">
      <div class="d-flex">
        <nav class="sidebar p-3 vh-100 text-white">
          <h4>EMS</h4>
          <ul class="list-unstyled mt-4">
            <li><router-link to="/dashboard" class="text-white mb-2 d-block">Dashboard</router-link></li>
            <li><router-link to="/employees" class="text-white mb-2 d-block">Employees</router-link></li>
            <li><a href="#" @click="logout" class="text-white">Logout</a></li>
          </ul>
        </nav>
        <div class="content flex-fill p-4">
          <router-view />
        </div>
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const authToken = inject('authToken');
const router = useRouter();

function logout(){
  localStorage.removeItem('token');
  authToken.value = null;
  router.push('/login');
}
</script>

<style>
.sidebar { width: 250px; background-color: #1a1a1a; }
.sidebar a { text-decoration: none; }
.sidebar a:hover { text-decoration: underline; }
.content { background-color: #121212; min-height: 100vh; color: #fff; }
</style>
