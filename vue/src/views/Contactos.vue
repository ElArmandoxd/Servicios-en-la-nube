<template>
<div>
    <div>
        <div class="row justify-content-around ">
            <div class="col-5 ml-5">
                <h5 class="text-center">Por favor introduzaca algun numero y su nombre</h5>
                <div class="">
                    <label>Nombre</label>
                    <input type="text" class=" col-12 form-control" v-model="nombre">
                </div>
                <div class="">
                    <label>Telefono</label>
                    <input type="text" class=" col-12 form-control" v-model="telefono">
                </div>
                <div class="row justify-content-around m-2">
                <button class="col-4 btn btn-outline-info" v-on:click="postContacto">Guardar</button>
                <button class="col-4 btn btn-outline-success">Generar XLSX</button>
                </div>
            </div>
        </div>
    </div >
    <div class="row justify-content-around my-5">
        <div class="col-5 ml-5">
        <h5>Sus contactos son: </h5>
            <table class="table">
                <thead >
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="c in contactos" :key="c">
                        <th scope="row">{{c.nombre}}</th>
                        <td>{{c.telefono}}</td>                      
                    </tr>
                </tbody>
            </table>
            </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
    name: "Contactos",
    data(){
        return{
            nombre: null,
            telefono: null,
            contactos: null
        }
    },
    created(){
        this.getContactos();
    },
    methods: {
        getContactos(){
            axios.get('http://35.223.20.141:3000/get/contactos').then(
                response =>{
                    console.log(response.data);
                    this.contactos = response.data;
                }).catch(
                    error =>{
                        console.log(error)
                    }
                );
        },
        postContacto(){
            axios.post('http://35.223.20.141:3000/post/contacto',{
                nombre: this.nombre,
                telefono: this.telefono
            }).then(response=>{
                console.log(response.data);
                this.getContactos();
            }).catch(error=>{
                console.log(error);
            });
        }
    },
}
</script>