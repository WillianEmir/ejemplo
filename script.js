const contenido = document.querySelector('.contenido')

document.addEventListener('DOMContentLoaded', cargarCards);
function cargarCards() {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarListadoPokemon(resultado.results))
}

function mostrarListadoPokemon(listadoPokemonArray) {
    console.log(listadoPokemonArray);
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
                                <a class="u-full-width button-primary button input agregar-carrito" data-id="${id}" onclick="hola(${id}, '${name}')">Agregar al Carrito</a>
                            </div>
                        </div>
                    </div>
                `;
            })
    })
}

function hola(id, name) {
    console.log(`Hola ${name}, eres el número ${id}`);
}