<template>
   <div class="container">
    <div class="card">
      <div class="card-header">
          <h4>Students</h4>
          <RouterLink to="/students/create" class="btn btn-primary float-end">Add Student</RouterLink>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="this.students.length > 0">
              <tr v-for="(student,index) in this.students" :key="index">
                <td>{{student.id}}</td>
                <td>{{student.name}}</td>
                <td>{{student.course}}</td>
                <td>{{student.email}}</td>
                <td>{{student.phone}}</td>
                <td>{{student.created_at}}</td>
                <td><RouterLink to="/" class="btn btn-primary float-end">
                  Edit
                </RouterLink></td>
                <td><button type="submit"class="btn btn-danger float-end">Delete</button></td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7"> Loading....</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
   </div>
  </template>
  
  <script >
import axios from 'axios';
import { useToast } from 'vue-toastification';


  export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    name: 'students',
    data(){
      return { 
        students: []
      }
    },
    mounted(){
      this.getStudents();
    },
    methods: {
      getStudents(){
        axios.get('http://127.0.0.1:8000/api/students').then(response => {
          this.students =response.data.data 
          this.toast.info("Student fetched successfully");
        })
      }
    }
  }


  </script>