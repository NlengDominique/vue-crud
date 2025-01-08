
<script setup >
import { ref } from 'vue';

const count = ref(0);

const increment = ()=>{ 
    count.value++
}

const decrement = ()=>{
    count.value--
}
</script>
<template>
    <p :class="{active:count>5}">Compteur : {{ count }}</p>
       <!-- <div v-show="count = 3">
        Je suis a 3
    </div> -->
    <!-- <div v-if="count >= 5">
        Bravo vous avez clique plus de 5 fois 
    </div>
    <div v-else>
        Vous avez clique moins de 5 fois 
    </div> -->
 
    <button @click="increment" class="m-4" >Incrementer</button>
    <button @click="decrement" class="m-4" >Decrementer</button>
</template>


<style>

.active{
    color: blue;
}
</style>