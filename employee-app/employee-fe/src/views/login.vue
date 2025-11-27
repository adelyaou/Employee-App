<template>
<div class="container py-5">
  <div class="card mx-auto shadow" style="max-width:400px;">
    <div class="card-body">
      <h4 class="text-center mb-4">Login dulu</h4>
      <form @submit.prevent="doLogin">
        <div class="mb-3">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" placeholder="Password" required />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          <span v-if="!loading">Login</span>
          <span v-else class="spinner-border spinner-border-sm"></span>
        </button>
        <p class="mt-2 text-center">
          Belum punya akun? <router-link to="/register">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth.services.js';
import { authToken } from '../main.js';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const doLogin = async () => {
  loading.value = true;
  try {
    const res = await login(email.value, password.value);
    localStorage.setItem('token', res.token);
    authToken.value = res.token;
    Swal.fire({ title:'Logged in', icon:'success', confirmButtonColor:'#0d47a1' });
    router.push('/dashboard');
  } catch (err){
    Swal.fire({
      title:'Waduh Login failed',
      text: err.response?.data?.msg || err.message,
      icon:'error',
      confirmButtonColor:'#0d47a1'
    });
  } finally { loading.value = false; }
}
</script>
