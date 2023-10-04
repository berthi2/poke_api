let historialStorage = JSON.parse(localStorage.getItem('historial'));

let historialPokemones = [];

if(historialStorage){
    historialPokemones = historialStorage;
}

console.log(historialPokemones);

const cuerpoTabla = document.querySelector('#tableBody');

historialPokemones.forEach((elemento) => {
    cuerpoTabla.innerHTML += `
        <tr>
            <td> 
                <img src="${elemento.img}" class="w-25" alt="">
            </td>
            <td>${elemento.name}</td>
        </tr>
    `
})