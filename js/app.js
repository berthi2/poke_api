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
respuestaJson= " [ {'nombre': 'pikachu', 'url': 'https://www.urlejemplo.com'},
{'nombre': 'pikachu', 'url': 'https://www.urlejemplo.com'},{'nombre': 'pikachu', 
'url': 'https://www.urlejemplo.com'}] ";

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


function renderTabla() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`)
        .then(response => response.json())
        .then(data => {
            const listado = data.results.map((elemento) => {
                return `<tr>
                <td>${elemento.name}</td>
                <td>${elemento.url}</td>
                <td><a href="" class="btn btn-outline-primary">Ver más</a></td>
            </tr>`
            });

            tableBody.innerHTML = listado.join('');
        })
        .catch(error => {
            console.error("Ha ocurrido un error:" + error)
        })
}

renderTabla();


