<template>
<div>
    <div>
        <div class="row justify-content-around ">
            <div class="col-5 ml-5">
                <h5 class="text-center">Por favor introduzaca algun numero y su nombre</h5>
                <div class="">
                    <label>Nombre</label>
                    <input type="text" class=" col-12 form-control">
                </div>
                <div class="">
                    <label>Telefono</label>
                    <input type="text" class=" col-12 form-control">
                </div>
                <div class="row justify-content-around m-2">
                <button class="col-4 btn btn-outline-dark">¡Ok!</button>
                <button class="col-4 btn btn-outline-dark">¡Mostrar tus contactos!</button>
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
                    <tr>
                    <th scope="row">Daniela solis de leon</th>
                    <td>6181001479</td>                      
                    </tr>
                    </tbody>
            </table>
            </div>
    </div>

</div>
</template>