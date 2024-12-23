<template>
    <div class="container mt-5">
        <div class="card">
                <div class="card-header">
                    <h4>Add Student</h4>
                </div>
                <div class="card-body">

                    <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                        <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                                {{ error[0] }}
                        </li>
                    </ul>

                    <!-- <form @submit.prevent> -->
                        <div class="mb-3">
                          <label for="" class="form-label">Name</label>
                          <input type="text" class="form-control" v-model="model.student.name">
                        </div>
                        <div class="mb-3">
                          <label for="" class="form-label">Course</label>
                          <input type="text" class="form-control" v-model="model.student.course" >
                        </div>
                        <div class="mb-3">
                          <label  class="form-label">Email</label>
                          <input type="email" class="form-control" v-model="model.student.email">
                        </div>
                        <div class="mb-3">
                          <label  class="form-label">Phone</label>
                          <input type="tel" class="form-control" v-model="model.student.phone">
                        </div>
                        <button type="submit" @click="saveStudent" class="btn btn-primary w-100">Save</button>
                      <!-- </form> -->
                </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    name: 'create',
    data(){
        return {
            errorList: '',
            model:{
                student:{
                    'name':'',
                    'course':'',
                    'email':'',
                    'phone':''
                }
            }
        }
    },
    methods: {
        saveStudent(){
            var mythis = this
            axios.post('http://127.0.0.1:8000/api/students',this.model.student).then(response => {
                    console.log(response.data);
                    this.toast.success("Student saved successfully");
                    this.model.student = {
                        name:'',
                        course:'',
                        email:'',
                        phone:''
                    }
                    this.errorList = ''
            }).catch(function(error){
                if(error.response){
                    if (error.response.status === 422) {
                    mythis.errorList = error.response.data.errors
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    }
                 
                }
            })
        }
    }
}
</script>