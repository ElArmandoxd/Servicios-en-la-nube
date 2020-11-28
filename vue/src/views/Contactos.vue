<template>
<div>
    <div>
        <div class="row justify-content-around ">
            <div class="col-5 ml-5">
                <h5 class="text-center">Guardar nuevo contacto</h5>
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
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="c in contactos" :key="c.id">
                        <th scope="row">{{c.nombre}}</th>
                        <td>{{c.telefono}}</td>    
                        <td><button class="btn btn-outline-danger" v-on:click="deleteContact(c.id)">Eliminar</button><button class="btn btn-outline-warning" data-toggle="modal" v-on:click="setInfo(c)" data-target="#actualizarModal">Actualizar</button></td>                  
                    </tr>
                </tbody>
            </table>
            </div>
    </div>
    <div class="modal fade" id="actualizarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar contacto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="nombre">
                        <label>Nombre:</label>
                        <input type="text" class=" col-12 form-control" v-model="nuevo_nombre">
                    </div>
                    <div class="telefono">
                        <label>Telefono:</label>
                        <input type="text" class=" col-12 form-control" v-model="nuevo_telefono">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-success" v-on:click="updateContact(id_up)" data-dismiss="modal">Save changes</button>
                </div>
        </div>
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
            contactos: null,
            nuevo_nombre: null,
            nuevo_telefono: null,
            id_up: null
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
                this.nombre = null;
                this.telefono = null;
            }).catch(error=>{
                console.log(error);
            });
        },
        deleteContact(contact_id){
            axios.post('http://35.223.20.141:3000/delete',{
                id: contact_id
            }).then(response =>{
                console.log(response.data);
                this.getContactos();
            }).catch(error =>{
                console.log(error);
            });
        },
        updateContact(contact_id){
            axios.post('http://35.223.20.141:3000/update',{
                id: contact_id,
                nuevo_nombre: this.nuevo_nombre,
                nuevo_telefono: this.nuevo_telefono,
            }).then(response => {
                console.log(response.data);
                this.getContactos();
                this.nuevo_nombre = null;
                this.nuevo_telefono = null;
            });
        },
        setInfo(i){
            this.id_up = i.id;
            this.nuevo_nombre = i.nombre;
            this.nuevo_telefono = i.telefono;
        }
    },
}
</script>