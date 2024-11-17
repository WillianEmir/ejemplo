const contenido = document.querySelector('.contenido');
const tbody = document.querySelector('#tbody');

let arrayCarrito = []; 

cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', cargarCards);

    contenido.addEventListener('click', agregarCarrito)
}

function cargarCards() {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarListadoPokemon(resultado.results))
}

function mostrarListadoPokemon(listadoPokemonArray) {

    listadoPokemonArray.forEach(pokemon => {
        fetch(pokemon.url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                const { name, sprites: { other: { dream_world: { front_default } } }, base_experience, id } = resultado;

                contenido.innerHTML += `
                    <div class="card-parent">
                        <div class="card">
                            <div>
                                <img src="${front_default}">
                            </div>
                            <div class="info-card">
                                <h4>${name}</h4>
                                <p>Poder: ${base_experience}</p>
                                <p>Precio: $400</p>
                                <a class="u-full-width button-primary button input agregar-carrito" data-id="${id}">Agregar al Carrito</a>
                            </div>
                        </div>
                    </div>
                `;
            })
    })
}  

function agregarCarrito(e) {

    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const pokemon = e.target.parentElement.parentElement;

        leerDatosPokemon(pokemon);
    }
}

function leerDatosPokemon(pokemon) {
    const objPokemon = {
        img: pokemon.querySelector('img').src,
        name: pokemon.querySelector('div h4').textContent, 
        price: 400,
        id: pokemon.querySelector('a').getAttribute('data-id')
    };
    
    arrayCarrito = [...arrayCarrito, objPokemon];

    console.log(arrayCarrito); 

    carritoHTML();

}

function carritoHTML() {
    arrayCarrito.forEach(pokemon => {
        tbody.innerHTML += `
            <tr>
                <td>${pokemon.name}</td>
            </tr>
        `;
    })
}