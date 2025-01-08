<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Ajouter un Produit</h4>
        </div>
        <div class="card-body">
  
          <!-- Affichage des erreurs -->
          <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
            <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
              {{ error[0] }}
            </li>
          </ul>
  
          <!-- Formulaire d'ajout de produit -->
          <form @submit.prevent="saveProduct">
            <div class="mb-3">
              <label for="name" class="form-label">Nom du Produit</label>
              <input 
                type="text" 
                id="name" 
                name="nom"
                class="form-control" 
                v-model="model.product.nom" 
                required
              >
            </div>
            <div class="mb-3">
                <label for="">Categorie</label>
              <select name="categorie" id="categorie" class="form-select" v-model="model.product.categorie_id">
                <option value="">Choisir une catégorie</option>
                <option v-for="(categorie,index) in categories" :key="categorie.id" :value="categorie.id">{{ categorie.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea 
                id="description" 
                name="description"
                class="form-control" 
                v-model="model.product.description" 
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Prix</label>
              <input 
                type="number" 
                id="price" 
                name="prix"
                class="form-control" 
                v-model="model.product.prix" 
                required 
                min="0"
                step="0.01"
              >
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image</label>
              <input 
                type="file" 
                id="image" 
                name="image"
                class="form-control" 
                @change="handleImageUpload" 
                accept="image/*"
              >
            </div>
            <div v-if="model.product.image">
                <img :src="model.product.imagePreview" class="img-fluid mb-3" alt="Image Preview">
            </div>
            <div class="mb-3">
                <label for="">En stock</label>
                <input type="checkbox" name="en_stock" id="stock" v-model="model.product.en_stock">
            </div>
            <button type="submit" class="btn btn-primary w-100">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true">En cours..</span>
                <span v-else>Enregistrer</span>
            </button>
          </form>
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import DataService from '@/services/DataService';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddProduct',
    setup() {
      const model = ref({
        product: {
          nom: '',
          description: '',
          prix: '',
          image: null,
          imagePreview: null,
          categorie_id: '',
            en_stock: true,
           // Ajouter cette propriété pour la preview de l'image
        },
      });
      
      const isLoading = ref(false);
      const toast = useToast();
      const router = useRouter();
      const errorList = ref({});
        const categories = ref([]);
      // Fonction pour gérer le téléchargement de l'image
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          model.value.product.image = file;
          const reader = new FileReader();
          reader.onload = (e) => {
            model.value.product.imagePreview = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
  
      // Fonction pour enregistrer le produit
      const saveProduct = async () => {
        // Réinitialiser les erreurs
        errorList.value = {};
        // Démarrer le loader
        isLoading.value = true;
  
        // Créer un objet FormData pour envoyer les données, y compris l'image
        const formData = new FormData();
        formData.append('nom', model.value.product.nom);
        formData.append('description', model.value.product.description);
        formData.append('prix', model.value.product.prix);
        formData.append('categorie_id', model.value.product.categorie_id);
        formData.append('en_stock', model.value.product.en_stock);
        if (model.value.product.image) {
          formData.append('image', model.value.product.image);
        }
  
        try {
          const response = await DataService.post('/api/produits', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // Gestion de la réponse réussie (par exemple, redirection ou message de succès)
          toast.success('Produit ajouté avec succès !', { timeout: 2000 });
          router.push('/produits');
  
          // Réinitialiser le formulaire
          model.value.product = {
            nom: '',
            description: '',
            prix: '',
            image: null,
            imagePreview: null, // Réinitialiser la preview de l'image
            categorie_id: '',
            en_stock: false,
          };
        } catch (error) {
          if (error.response && error.response.data) {
            errorList.value = error.response.data.errors || { general: ['Une erreur est survenue.'] };
          } else {
            errorList.value = { general: ['Impossible de se connecter au serveur.'] };
          }
        } finally {
          // Terminer le loader
          setTimeout(() => {
            isLoading.value = false;
                }, 2000); 
      };
    };
      const getAllCategories = async () => {
        try {
        const response = await DataService.get('/api/categories');
        // Vérifie si la réponse contient des données et si elles sont dans le bon format
        if (Array.isArray(response.data)) {
          categories.value = response.data;
        } else {
          console.error('Erreur dans la structure des catégories :', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
      };
      onMounted(() => {
        getAllCategories();
      });
  
      return {
        model,
        errorList,
        saveProduct,
        handleImageUpload,
        isLoading,
        categories
      };
    },
  };
  </script>
  
  
  <style>
  .container {
    max-width: 600px;
  }
  .card {
    border: none;
    border-radius: 10px;
  }
  .card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  .card-body {
    padding: 20px;
  }
  </style>
  