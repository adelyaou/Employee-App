<template>
  <div class="card mb-3 p-3 bg-dark text-white">
    <h5>{{ employee?.id ? 'Edit Employee' : 'Add Employee' }}</h5>
    <form @submit.prevent="handleSubmit">
      <div class="mb-2">
        <label>Name</label>
        <input v-model="emp.name" type="text" class="form-control" required />
      </div>
      <div class="mb-2">
        <label>Email</label>
        <input v-model="emp.email" type="email" class="form-control" required />
      </div>
      <div class="mb-2">
        <label>Position</label>
        <input v-model="emp.position" type="text" class="form-control" />
      </div>
      <div class="mb-2">
        <label>Salary</label>
        <input v-model="emp.salary" type="number" class="form-control" />
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary me-2">Save</button>
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import API from '../api/api.js';

export default {
  props: ['employee'],
  setup(props, { emit }){
    const emp = ref({ name:'', email:'', position:'', salary:0, ...props.employee });

    const handleSubmit = async () => {
      if(emp.value.id){
        await API.put(`/employees/${emp.value.id}`, emp.value);
      } else {
        await API.post('/employees', emp.value);
      }
      emit('saved');
    };

    return { emp, handleSubmit };
  }
}
</script>
