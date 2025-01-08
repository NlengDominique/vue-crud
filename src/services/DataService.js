
import axios from 'axios';

const DataService  = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data"
      

    },
})

export default DataService;