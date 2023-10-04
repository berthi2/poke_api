/*const ejemploPromesa = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('promesa finalizada');
    }, 2000);
})


console.log('se ejecuta primero');

ejemploPromesa.then((res) => {
    console.log(res);
})

console.log('se ejecuta ultimo')
*/


/*
respuestaJson= " [ {'nombre': 'pikachu', 'url': 'https://www.urlejemplo.com'},{'nombre': 'pikachu', 'url': 'https://www.urlejemplo.com'},{'nombre': 'pikachu', 'url': 'https://www.urlejemplo.com'}] ";

respuestaJson.json();

[
    {
        nombre:'pikachu',
        url : 'https://www.urlejemplo.com'
    },
    {
        nombre:'pikachu',
        url : 'https://www.urlejemplo.com'
    },
    {
        nombre:'pikachu',
        url : 'https://www.urlejemplo.com'
    }
]

*/

/*
fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
.then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})
*/


const tableBody = document.querySelector('#tableBody');
const myModal = new bootstrap.Modal(document.getElementById('modalPokemonData'));

let historialStorage = JSON.parse(localStorage.getItem('historial'));

let historialPokemones = [];

if(historialStorage){
    historialPokemones = historialStorage;
}



function renderTabla(){
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
    .then(response => response.json())
    .then(data => {
        const listado = data.results.map((elemento) => {
            return `<tr>
                <td>${elemento.name}</td>
                <td>${elemento.url}</td>
                <td>
                <button type="button" id="${elemento.url}" class="btn btn-outline-primary btnVerMas" >
                    Ver más
                </button>
                </td>
            </tr>`
        });

        tableBody.innerHTML = listado.join('');

        const botones = document.querySelectorAll('.btnVerMas');

        botones.forEach((btn) => {
            btn.addEventListener('click', () => {
                const urlApi = btn.id; 

                fetch(urlApi)
                .then( response => response.json())
                .then(data => {
                    console.log(data);
                    const tituloModal = document.querySelector('.modal-title');
                    const cuerpoModal = document.querySelector('.modal-body');
                    tituloModal.textContent = data.name;

                    const tipo = data.types.map((elemento) => {
                        return elemento.type.name;
                    })
                    const habilidades = data.abilities.map((elemento) => {
                        return elemento.ability.name;
                    })


                    cuerpoModal.innerHTML = `
                        <img src="${data.sprites.front_default}" class="w-25 mx-auto d-block" alt="">
                        <p class="text-center"><strong>Peso: </strong> ${data.weight}</p>
                        <p class="text-center"><strong>Tipo: </strong> ${tipo.join(', ')}</p>
                        <p class="text-center"><strong>Habilidades: </strong> ${habilidades.join(', ')}</p>
                    `;
                    myModal.show();


                    if(!historialPokemones.find((elemento) => elemento.name == data.name)){
                        historialPokemones.push({
                            name: data.name,
                            img: data.sprites.front_default
                        })
                    }

                    console.log(historialPokemones)

                    localStorage.setItem('historial', JSON.stringify(historialPokemones));
                })

            })
        })

    })
    .catch(error => {
        console.error("Ha ocurrido un error:" + error)
    })
}

renderTabla();


