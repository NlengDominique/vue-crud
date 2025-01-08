<template>
  <div class="">
    <button class="btn btn-success mt-4 mx-4" @click="goToCreate"> Ajouter un produit</button>
  </div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 text-center mb-4">
          <h2>Our Products</h2>
        </div>
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
          <div class="card shadow-sm mb-4">
            <img v-if="product.image" :src="product.image" class="card-img-top" :alt="product.nom" 
           />
            <div class="card-body">
              <h5 class="card-title">{{ product.nom }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text">{{ product.categorie.name }}</p>
              <p class="card-text fw-bold">Price: ${{ product.prix }}</p>
              <p>{{ product.en_stock ? 'En stock' : 'Rupture de stock' }}</p>
              <button class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DataService from '@/services/DataService';
import { useRoute, useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    const fetchProducts = async () => {
      try {
        loading.value = true;
        const response = await DataService.get('/api/produits');
        toast.success('Product fetched successfully', { timeout: 2000 });
        products.value = response.data.map(product => {
        product.image = product.image ? `http://127.0.0.1:8000/storage/${product.image}` : null;
          return product;
          
          

        });
      } catch (err) {
        error.value = 'Failed to fetch products';
        console.error(err);
      } 
    };
    const goToCreate = () => {
      router.push('/produits/create');
    };

    onMounted(() => {
      fetchProducts();
    });

      products,
      loading,
      error,
      goToCreate
  

</script>

  
  <style>
  .container {
    max-width: 1200px;
  }
  .card {
    border: none;
    border-radius: 10px;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .card-body {
    text-align: center;
  }
  </style>
  