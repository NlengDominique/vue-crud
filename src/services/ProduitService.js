import DataService from "./DataService";

const ProduitService = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

}
const getAllProducts = async () => {
    try{
        const response  = await DataService.get('/api/produits');
        return response.data;
    }
    catch(error){
        console.error('Erreur lors de la récupération des produits:', error.response ? error.response.data : error);
        throw error;
    }
}

const getProduct = async (id) => {
    try{
        const response  = await DataService.get(`/api/produits/${id}`);
        return response.data;
    }
    catch(error){
        console.error(`Erreur lors de la récupération du produit avec ID ${id}:`, error.response ? error.response.data : error);
        throw error;
    }
}

const createProduct = async (product) => {
    try{
    const response  = await DataService.post('/api/produits', product);
    return response.data;}
    catch(error){
        console.error('Erreur lors de la création du produit:', error.response ? error.response.data : error);
        throw error;
    }
}

const updateProduct = async (id, product) => {
    const response  = await DataService.put(`/api/produits/${id}`, product);
    return response.data;
 }

const deleteProduct = async (id) => { 
    const response  = await DataService.delete(`/api/produits/${id}`);
    return response.data;
}
export default ProduitService;