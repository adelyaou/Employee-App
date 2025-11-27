<template>
  <div class="d-flex">
    <div class="content flex-grow-1 p-4">
      <h3>Employees</h3>
      <button class="btn btn-primary mb-3" @click="create">+ Add Employee</button>
      <employee-form v-if="showForm" :employee="editing" @saved="onSaved" @cancel="showForm=false" />
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.salary }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="edit(emp)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteEmp(emp.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EmployeeForm from '../components/employeeForm.vue';
import API from '../api/api.js';
import Swal from 'sweetalert2';
import { authToken } from '../main.js';
import { useRouter } from 'vue-router';

export default {
  components: { EmployeeForm },
  data(){ return { employees: [], loading:true, showForm:false, editing:null }; },
  async mounted(){ await this.load(); },
  methods:{
    async load(){
      this.loading=true;
      try { this.employees = (await API.get('/employees')).data; }
      finally { this.loading=false; }
    },
    create(){ this.editing=null; this.showForm=true; },
    edit(emp){ this.editing=emp; this.showForm=true; },
    async deleteEmp(id){
      const confirmed = await Swal.fire({ title:'Confirm delete?', showCancelButton:true, confirmButtonColor:'#0d47a1' });
      if (!confirmed.isConfirmed) return;
      await API.delete(`/employees/${id}`);
      Swal.fire({title:'Deleted', icon:'success', confirmButtonColor:'#0d47a1'});
      this.load();
    },
    onSaved(){ this.showForm=false; this.load(); Swal.fire({title:'Saved', icon:'success', confirmButtonColor:'#0d47a1'}); },
    logout(){ localStorage.removeItem('token'); authToken.value=null; this.$router.push('/login'); },
    goDashboard(){ this.$router.push('/dashboard'); }
  }
}
</script>

<style scoped>
.sidebar{ width: 250px; }
.content{ background-color: #121212; min-height:100vh; color:white; }
</style>
