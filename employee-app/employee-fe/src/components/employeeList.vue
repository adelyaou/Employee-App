<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Posisi</th>
          <th>Gaji</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.salary }}</td>
          <td>
            <button @click="$emit('edit', emp)" class="btn-primary">Edit</button>
            <button @click="$emit('delete', emp.id)" class="btn-secondary">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({ employees: Array })
const emit = defineEmits(['edit', 'delete'])
</script>

<style scoped>
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
.btn-primary { background: var(--primary); color: #fff; border: none; padding: 0.3rem 0.7rem; cursor: pointer; margin-right: 0.3rem; }
.btn-secondary { background: #aaa; color: #fff; border: none; padding: 0.3rem 0.7rem; cursor: pointer; }
</style>