const contenido = document.querySelector('.contenido');
const tbody = document.querySelector('#tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let arrayCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    cargarCards();

    contenido.addEventListener('click', agregarCarrito);

    tbody.addEventListener('click', eliminarPokemon);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', () => {
        arrayCarrito = JSON.parse(localStorage.getItem('arrayCarrito')) ?? [];
        carritoHTML();
    })
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

    if (e.target.classList.contains('agregar-carrito')) {
        const pokemon = e.target.parentElement.parentElement;

        leerDatosPokemon(pokemon);
    }
}

function leerDatosPokemon(pokemon) {
    const objPokemon = {
        img: pokemon.querySelector('img').src,
        name: pokemon.querySelector('div h4').textContent,
        price: 400,
        id: pokemon.querySelector('a').getAttribute('data-id'),
        amount: 1
    };

    if (arrayCarrito.some(element => objPokemon.id === element.id)) {
        const updateArray = arrayCarrito.map(element => {
            if (objPokemon.id === element.id) {
                parseInt(element.amount++)
                return element;
            } else {
                return element;
            }
        })
        arrayCarrito = [...updateArray];
    } else {
        arrayCarrito = [...arrayCarrito, objPokemon];
    }
    carritoHTML();
}

function carritoHTML() {

    limpiarHTML(tbody);

    arrayCarrito.forEach(pokemon => {
        tbody.innerHTML += `
            <tr>
                <td><img src="${pokemon.img}"></td>
                <td>${pokemon.name}</td>
                <td>$400</td>
                <td>${pokemon.amount}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${pokemon.id}">X</a>
               </td>
            </tr>
        `;
    })

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('arrayCarrito', JSON.stringify(arrayCarrito))
}

function eliminarPokemon(e) {
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')) {
        const IdBtnBorrar = e.target.getAttribute('data-id');
        arrayCarrito = arrayCarrito.filter(element => IdBtnBorrar !== element.id);

        carritoHTML();
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    arrayCarrito = [];
    sincronizarStorage();
    limpiarHTML(tbody);
}

function limpiarHTML(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild)
    }
}