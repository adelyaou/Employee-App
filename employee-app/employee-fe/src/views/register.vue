<template>
  <div class="container py-5">
    <div class="card mx-auto shadow" style="max-width: 400px;">
      <div class="card-body">
        <h4 class="card-title mb-4 text-center">Register dulu ges</h4>
        <form @submit.prevent="doRegister">
          <div class="mb-3">
            <label>Name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Full Name" required />
          </div>
          <div class="mb-3">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control" placeholder="Email" required />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Password" required />
          </div>
          <button class="btn btn-primary w-100" :disabled="loading">
            <span v-if="!loading">Register</span>
            <span v-else class="spinner-border spinner-border-sm"></span>
          </button>
          <p class="mt-2 text-center">
            Sudah punya akun? <router-link to="/login">Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../services/auth.services.js';
import { useRouter } from 'vue-router';
import { authToken } from '../main.js';
import { ref } from 'vue';
import Swal from 'sweetalert2';

export default {
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const loading = ref(false);

    const doRegister = async () => {
      loading.value = true;
      try {
        await register({ name: name.value, email: email.value, password: password.value });
        Swal.fire({
          title: 'Account created!',
          icon: 'success',
          confirmButtonColor: '#0d47a1'
        });
        router.push('/login');
      } catch (err) {
        Swal.fire({
          title: 'Register failed',
          text: err.response?.data?.msg || err.message,
          icon: 'error',
          confirmButtonColor: '#0d47a1'
        });
      } finally {
        loading.value = false;
      }
    };

    return { name, email, password, loading, doRegister };
  }
}
</script>
